const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('userLoggedIn', (user) => {
  console.log(`User ${user} logged in.`);
});

emitter.on('userLoggedOut', (user) => {
  console.log(`User ${user} logged out.`);
});

emitter.on('sessionExpired', (user) => {
  console.log(`Session expired for ${user}.`);
});

const user = "Deepak";

emitter.emit("userLoggedIn", user);
emitter.emit("userLoggedOut", user);

setTimeout(() => {
  emitter.emit("sessionExpired", user);
}, 5000);
