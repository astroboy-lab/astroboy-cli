const opn = require('opn');

module.exports = {
  name: "doc",
  description: "查看 Astroboy（阿童木） 框架文档",
  help: () => {
    console.log('  Examples:');
    console.log('');
    console.log('    $ ast doc');
    console.log();
  },
  action: () => {
    opn('https://astroboy-lab.github.io/astroboy/');
    process.exit(0);
  }
};