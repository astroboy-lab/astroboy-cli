const action = require('./action');

module.exports = {
  name: "init <ProjectName>",
  description: "初始化一个 astroboy 项目",
  action: action,
  help: () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ ast init example');
    console.log();
  }
};