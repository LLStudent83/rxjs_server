const { v4: uuidv4 } = require('uuid');

class Messages {
  getMessages() {
    this.objMess = {
      status: 'ok',
      timestamp: Date.now(),
      messages: [
        {
          id: uuidv4(),
          from: 'anya@ivanova',
          subject: 'Hello from Anya',
          body: 'Long message body here',
          received: Date.now(),
        },
        {
          id: uuidv4(),
          from: 'alex@petrov',
          subject: 'Hello from Andrey Petrov!',
          body: 'Long message body here',
          received: Date.now(),
        },

      ],
    };
    return this.objMess;
  }
}

const messages = new Messages();
module.exports = messages;
