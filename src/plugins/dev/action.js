const fs = require('fs-extra');
const path = require('path');
const nodemon = require('nodemon');
const chalk = require('chalk');
const Util = require('../../lib/util');
const { DEFAULT_MOCK_URL } = require('../../config');

module.exports = function (command) {
  const projectRoot = Util.getProjectRoot();
  if (!fs.existsSync(`${projectRoot}/app/app.js`)) {
    console.log(chalk.red(`当前项目不存在文件 ${projectRoot}/app/app.js`));
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
    script: path.join(projectRoot, 'app/app.js')
  };

  // 传递了 --debug 参数，示例：
  // zan dev --debug
  // zan dev --debug koa:application
  if (command.debug && command.debug === true) {
    config.env.DEBUG = '*';
  } else if (command.debug && command.debug !== true) {
    config.env.DEBUG = command.debug;
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
  }).on('quit', () => {
    console.log(chalk.green('应用退出成功'));
  }).on('restart', (files) => {
    console.log(chalk.green('监听到文件修改：', files));
  });
}