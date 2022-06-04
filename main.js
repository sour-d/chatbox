const fs = require('fs');

class User {
  constructor(username, msgDataFile) {
    this.username = username;
    this.msgDataFile = msgDataFile;
  }

  messages() {
    try {
      const messages = fs.readFileSync(this.msgDataFile, 'utf8');
      return JSON.parse(messages);
    } catch (err) {
      return [];
    }
  }

  newMessageArrived() {
    const messages = this.messages();

    return messages.some((message) => {
      return message.hasRead === undefined;
    });
  }

  getNewMessage() {
    const messages = this.messages();

    return messages.find((message) => {
      return message.hasRead === undefined;
    });
  }

  sendMessage(newMsg) {
    const formattedNewMsg = { message: newMsg };
    const oldMessages = this.messages();
    oldMessages.push(formattedNewMsg);
    this.updateFile(JSON.stringify(oldMessages));
  }

  updateFile(content) {
    try {
      fs.writeFileSync(this.msgDataFile, content, 'utf8');
    } catch (err) {
      throw 'Could not write';
    }
  }
}

const user = new User('bot', './chatData.json');

fs.watchFile('./chatData.json', () => {
  if (user.newMessageArrived()) {
    console.log(user.getNewMessage().message);
  }
});

process.stdin.setEncoding('utf8');
process.stdin.on('data', (message) => {
  console.log(user.sendMessage(message));
  process.exit(0);
});