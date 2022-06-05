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

    const newMsg = messages.filter((message) => {
      return message.hasRead === undefined;
    });

    this.markAsRead(newMsg);
    this.updateFile(JSON.stringify(messages));
    return this.formatNewMsg(newMsg);
  }

  markAsRead(newMsges) {
    newMsges.filter(msg => {
      msg.hasRead = true;
    });
  }

  formatNewMsg(newMsges) {
    return newMsges.map(msg => {
      return `${msg.from} : ${msg.message}`;
    }).join('\n');
  }

  sendMessage(newMsg) {
    const formattedNewMsg = { message: newMsg.trim(), from: this.username };
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
exports.User = User;
