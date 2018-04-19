const boxen = require('boxen');
const chalk = require('chalk');

module.exports = {

  printError(msg) {
    console.log(boxen(chalk.red(`${msg}`), {
      padding: 1,
      borderStyle: 'classic'
    }));
  }

};