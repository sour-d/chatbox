const { EventEmitter } = require('events');
const fs = require('fs');
const { User } = require("./user");

const getUserName = () => {
  try {
    const userData = JSON.parse(fs.readFileSync('./localData.json', 'utf8'));
    return userData ? userData.username : 'Bot';
  } catch (error) {
    return 'Bot';
  }
}

const main = () => {
  const username = getUserName();
  const user = new User(username, './chatData.json');

  const eventEmitter = new EventEmitter();
  eventEmitter.on('recive-new-msg', (user) => reciveNewMsg(user));
  eventEmitter.on('send-new-msg', (user, message) => sendNewMsg(user, message));

  //checking for new msg
  fs.watchFile('./chatData.json', () => {
    eventEmitter.emit('recive-new-msg', user);
  });

  // sending new msg if user give any input
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (message) => {
    console.log('\n');
    eventEmitter.emit('send-new-msg', user, message);
  });
};

const sendNewMsg = (user, message) => {
  user.sendMessage(message);
  process.exit(2);
};

const reciveNewMsg = (user) => {
  if (user.newMessageArrived()) {
    console.log(user.getNewMessage() + '\n');
    process.exit(3);
  }
};

main();
