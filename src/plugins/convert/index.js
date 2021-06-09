const action = require('./action');

module.exports = {
  name: 'convertRouter',
  description: '升级路由配置到 V2 版本',
  options: [['--dir [dir]', '指定路由文件目录，默认 app/routers']],
  action: action,
  help: () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ ast convertRouter');
    console.log('    $ ast convertRouter --dir ./app/routers');
    console.log();
  },
};
