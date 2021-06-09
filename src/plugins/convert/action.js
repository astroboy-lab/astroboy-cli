const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const glob = require('fast-glob');
const { METHODS } = require('http');
const prettier = require('prettier');
const util = require('util');

const { DEFAULT_ROUTER_DIR } = require('../../config');

function obj2JSContent(obj) {
  return `module.exports = ${util.format(obj)}`;
}

function prettyCode(code) {
  return prettier.format(code, {
    singleQuote: true,
    trailingComma: 'es5',
    parser: 'babel',
  });
}

module.exports = function (command) {
  let routerDir = DEFAULT_ROUTER_DIR;
  if (command.dir && typeof command.dir === 'string') {
    routerDir = command.dir;
  }
  const fullRouterDir = path.join(process.cwd(), routerDir);
  if (!fs.existsSync(path.join(process.cwd(), routerDir))) {
    console.log(chalk.red(`指定目录 ${fullRouterDir} 不存在`));
    process.exit(1);
  }

  const files = glob.sync(path.join(fullRouterDir, './**/*.js'));

  const ignoreFiles = [];
  console.log(chalk.blue('开始转换 ===>'));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileContent = fs.readFileSync(file, {
      encoding: 'utf-8',
    });
    if (fileContent.indexOf('require') > -1) {
      ignoreFiles.push(file);
    } else {
      const routerArr = require(file);
      const newRouterArr = [];
      routerArr.forEach((item) => {
        if (METHODS.indexOf(item[0].toUpperCase()) > -1) {
          item.unshift('');
        }
        if (Array.isArray(item[4])) {
          newRouterArr.push({
            name: item[0],
            method: item[1],
            path: item[2],
            preHandler: item[4].slice(0, -1),
            handler: `${item[3]}:${item[4][item[4].length - 1]}`,
          });
        } else {
          newRouterArr.push({
            name: item[0],
            method: item[1],
            path: item[2],
            handler: `${item[3]}:${item[4]}`,
          });
        }
      });

      console.log(chalk.blue(`开始转换 ${i + 1}：${file}`));
      const ret = fs.writeFileSync(
        file,
        prettyCode(obj2JSContent(newRouterArr))
      );
      if (ret) {
        console.log(chalk.red(`转换失败 ${i + 1}：${file}`));
      } else {
        console.log(chalk.green(`转换成功 ${i + 1}：${file}`));
      }
    }
  }

  if (ignoreFiles.length > 0) {
    console.log(chalk.red('\n以下路由文件转换失败，请手动修改！！！\n'));
    ignoreFiles.forEach((item) => {
      console.log(chalk.red(item));
    });
  }
};
