// Print Node.js version
console.log("Node.js Version:", process.version);
console.log("Current File:", __filename);
console.log("Current Directory:", __dirname);
const intervalId = setInterval(() => {
  console.log("Welcome to Node.js basics!");
}, 3000);
setTimeout(() => {
  clearInterval(intervalId);
  console.log("Timer stopped after 10 seconds.");
}, 10000);
