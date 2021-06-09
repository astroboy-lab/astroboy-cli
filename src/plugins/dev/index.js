const action = require('./action');

module.exports = {
  name: 'dev',
  description: '本地开发，开启后端服务',
  options: [
    ['--debug [debugName]', '开启 debug 模式'],
    ['--env [NODE_ENV]', '设置 NODE_ENV 环境变量，默认 development'],
    ['--port [NODE_PORT]', '设置 NODE_PORT 环境变量，默认 8201'],
    [
      '--mock [proxyUrl]',
      '开启 mock 模式，默认 proxy 地址为 http://127.0.0.1:8001',
    ],
    ['--ts [open]', '开启 ts-node 模式'],
    ['--tsconfig [config]', '使用自定义的ts编译配置文件'],
    ['--inspect [inspect]', '启用inspector，开启编辑器断点调试'],
    ['--watch [watchDirs]', '指定额外的监听目录'],
    ['--ignore [ignoreDirs]', '指定忽略监听的目录'],
  ],
  action: action,
  help: () => {
    console.log('');
    console.log('  Examples:');
    console.log('');
    console.log('    $ ast dev');
    console.log('    $ ast dev --debug');
    console.log('    $ ast dev --debug koa:application');
    console.log('    $ ast dev --debug --mock');
    console.log('    $ ast dev --mock http://127.0.0.1:8001');
    console.log('    $ ast dev --mock');
    console.log('    $ ast dev --env pre');
    console.log('    $ ast dev --port 8201');
    console.log('    $ ast dev --env qa --port 8201');
    console.log('    $ ast dev --ts');
    console.log('    $ ast dev --ts --tsconfig app/tsconfig.json');
    console.log('    $ ast dev --ts --inspect');
    console.log('    $ ast dev --watch definitions');
    console.log('    $ ast dev --ignore definitions');
    console.log();
  },
};
