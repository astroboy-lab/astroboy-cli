const fs = require('fs-extra');
const path = require('path');
const nodemon = require('nodemon');
const chalk = require('chalk');
const shell = require('shelljs');
const Util = require('../../lib/util');
const { DEFAULT_MOCK_URL } = require('../../config');

module.exports = function (command) {
  const projectRoot = Util.getProjectRoot();
  if (!command.ts && !fs.existsSync(`${projectRoot}/app/app.js`)) {
    console.log(chalk.red(`当前项目不存在文件 ${projectRoot}/app/app.js`));
    return;
  }
  if (command.ts && !fs.existsSync(`${projectRoot}/app/app.ts`)) {
    console.log(chalk.red(`当前项目不存在文件 ${projectRoot}/app/app.ts`));
    return;
  }
  const config = {
    verbose: true,
    env: {
      NODE_ENV: command.env ? command.env : 'development',
      NODE_PORT: command.port ? command.port : 8201
    },
    watch: [
      path.join(projectRoot, 'app/**/*.*'),
      path.join(projectRoot, 'config/**/*.*'),
      path.join(projectRoot, 'plugins/**/*.*')
    ],
    ignore: [

    ],
    // script: path.join(projectRoot, 'app/app.js')
  };

  // 传递了 --debug 参数，示例：
  // zan dev --debug
  // zan dev --debug koa:application
  if (command.debug && command.debug === true) {
    config.env.DEBUG = '*';
  } else if (command.debug && command.debug !== true) {
    config.env.DEBUG = command.debug;
  }

  // 传递了 --inspect 参数，示例：
  // ast dev --inspect
  const node = `node${!!command.inspect ? " --inspect" : ""}`;

  // 传递了 --ts 参数，示例：
  // ast dev --ts
  if (command.ts) {
    const ts_node = `-r ${path.resolve(__dirname, "./ts-node")}`;
    const tsc_path_map = `-r ${require.resolve("tsconfig-paths").replace("/lib/index.js", "")}/register`
    // 同时传递了 --ts和--tsconfig 参数，示例：
    // ast dev --ts --tsconfig app/tsconfig.json
    if (command.tsconfig) {
      config.env.TS_NODE_PROJECT = command.tsconfig;
    }
    config.env.APP_EXTENSIONS = JSON.stringify(['js', 'ts']);
    config.exec = `${node} ${ts_node} ${tsc_path_map} ${path.join(projectRoot, 'app/app.ts')}`;
  } else {
    config.env.APP_EXTENSIONS = JSON.stringify(['js']);
    config.exec = `${node} ${path.join(projectRoot, 'app/app.js')}`;
  }

  // 传递了--mock 参数
  // zan dev --mock
  // zan dev --mock https://127.0.0.1:8001
  if (command.mock) {
    const url = command.mock === true ? DEFAULT_MOCK_URL : command.mock;
    config.env.HTTP_PROXY = url;
    config.env.HTTPS_PROXY = url;
  }

  nodemon(config).on('start', () => {
    console.log(chalk.green('应用启动中...\n'));
    console.log(chalk.green('环境变量：'));
    console.log(chalk.green(`NODE_ENV: \t${config.env.NODE_ENV}`));
    console.log(chalk.green(`NODE_PORT: \t${config.env.NODE_PORT}`));
    if (config.env.DEBUG) {
      console.log(chalk.green(`DEBUG: \t${config.env.DEBUG}`));
    }
    if (config.env.HTTP_PROXY) {
      console.log(chalk.green(`HTTP_PROXY: \t${config.env.HTTP_PROXY}`));
    }
    if (config.env.HTTPS_PROXY) {
      console.log(chalk.green(`HTTPS_PROXY: \t${config.env.HTTPS_PROXY}`));
    }
    console.log(chalk.green('\n监听目录变化：'));
    for (let i = 0; i < config.watch.length; i++) {
      console.log(chalk.green(config.watch[i]));
    }

    let execCommand = 'npm --registry=http://registry.npm.qima-inc.com outdated ';
    const projectConfig = Util.getProjectConfig();
    if (projectConfig.versionValid && Array.isArray(projectConfig.versionValid)) {
      execCommand += projectConfig.versionValid.join(' ');
    }
    const ret = shell.exec(execCommand);
  }).on('quit', () => {
    console.log(chalk.green('应用退出成功'));
  }).on('restart', (files) => {
    console.log(chalk.green('监听到文件修改：', files));
  });
}