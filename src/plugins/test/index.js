const action = require('./action');

module.exports = {
  name: "test",
  description: "执行测试用例",
  options: [
    ['--watch', '开启 watch 模式'],
    ['--clearCache', '清理测试缓存'],
  ],
  action: action,
  help: () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ ast test');
    console.log('    $ ast test --watch');
    console.log('    $ ast test --clearCache');
    console.log();
  }
};
