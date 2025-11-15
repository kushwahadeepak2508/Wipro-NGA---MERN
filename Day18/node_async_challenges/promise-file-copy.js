const fs = require('fs').promises;

console.log("Starting file copy...");

fs.readFile('input.txt', 'utf8')
  .then(data => fs.writeFile('output.txt', data))
  .then(() => console.log("File copied successfully!"))
  .catch(err => console.error("Error occurred:", err));