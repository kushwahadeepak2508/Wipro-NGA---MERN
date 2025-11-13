import figlet from "figlet";
import chalk from "chalk";

figlet("Welcome to Node.js", function(err, data) {
  if (err) {
    console.log("Something went wrong...", err);
    return;
  }

  console.log(chalk.green.bold(data));
});
