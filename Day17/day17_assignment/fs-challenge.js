const fs = require('fs').promises;

async function run() {
  const fileName = 'feedback.txt';
  const userInput = "Node.js is awesome!";

  try {
    await fs.writeFile(fileName, userInput);
    console.log("Data written successfully.");

    console.log("Reading file...");
    const data = await fs.readFile(fileName, "utf8");
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
