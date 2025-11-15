const fs = require('fs').promises;

async function copyFile() {
  try {
    console.log("Starting async file copy...");

    const data = await fs.readFile('input.txt', 'utf8');

    await new Promise(resolve => setTimeout(resolve, 1000));

    await fs.writeFile('output.txt', data);

    console.log("File copied successfully! (async/await)");
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

copyFile();