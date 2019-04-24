const action = require('./action');

module.exports = {
  name: "build",
  description: "编译 Typescript 文件",
  options: [],
  action: action,
  help: () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ ast build');
    console.log();
  }
};
