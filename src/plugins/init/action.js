const fs = require("fs-extra");
const chalk = require("chalk");

module.exports = function (ProjectName) {
  if (fs.existsSync(ProjectName)) {
    console.log(
      chalk.red(`初始化失败，当前目录已存在名为 ${ProjectName} 的项目`)
    );
    return;
  }
};
