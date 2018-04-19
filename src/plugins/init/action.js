const fs = require('fs-extra');
const chalk = require('chalk');
const print = require('../../lib/print');

module.exports = function (ProjectName) {
  if (fs.existsSync(ProjectName)) {
    print.printError(`初始化失败，当前目录已存在名为 ${ProjectName} 的项目`);
    return;
  }

}