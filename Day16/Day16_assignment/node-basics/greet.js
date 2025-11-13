import moment from "moment";

// Get name from command line
const name = process.argv[2];

if (!name) {
  console.log("Please provide your name: node greet.js John");
  process.exit(1);
}

// Format date and time
const currentDate = moment().format("ddd MMM D YYYY, h:mm A");

console.log(`Hello, ${name}! Today is ${currentDate}`);
