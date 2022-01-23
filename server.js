/* eslint-disable max-len */
const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');

const messages = require('./message');

const app = new Koa();

app.use(koaBody({
  json: true,
}));

// eslint-disable-next-line consistent-return
app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin');
  if (!origin) {
    // eslint-disable-next-line no-return-await
    return await next();
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers });
    try {
      return await next();
    } catch (e) {
      e.headers = { ...e.headers, ...headers };
      throw e;
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
    });

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'));
    }

    ctx.response.status = 204;
  }
});
const report = messages.getMessages();

app.use(async (ctx) => {
  console.log('ctx', ctx);
  // console.log(report);

  // ctx.response.body = setInterval(() => report, 3000);
  ctx.response.body = report;
  console.log('ctx', ctx.response.body);
});

// console.log(report);

const port = process.env.PORT || 8888;
const server = http.createServer(app.callback());

server.listen(port);
