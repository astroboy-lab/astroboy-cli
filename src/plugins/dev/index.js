const action = require('./action');

module.exports = {
  name: "dev",
  description: "本地开发，开启后端服务",
  options: [
    ['--debug [debugName]', '开启 debug 模式'],
    ['--env [NODE_ENV]', '设置 NODE_ENV 环境变量，默认 development'],
    ['--port [NODE_PORT]', '设置 NODE_PORT 环境变量，默认 8201'],
    ['--mock [proxyUrl]', '开启 mock 模式，默认 proxy 地址为 http://127.0.0.1:8001']
  ],
  action: action,
  help: () => {
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
    console.log();
  }
};
