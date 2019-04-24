const shell = require("shelljs");

module.exports = function(command) {
  console.log("========== tsc 版本号 ==========");
  let result = shell.exec("tsc -v");

  if (result.code !== 0) {
    shell.exit(-1);
  }

  console.log("========== 开始 TS 编译 ==========");
  result = shell.exec("tsc");
  if (result.code !== 0) {
    shell.exit(-1);
  }
  console.log("========== 结束 TS 编译 ==========");

  console.log("========== 开始文件拷贝 ==========");
  result = shell.cp("-R", "./app/views", "./dist/app/views");
  if (result.code !== 0) {
    shell.exit(-1);
  }
  result = shell.cp("./config/*.json", "./dist/config");
  if (result.code !== 0) {
    shell.exit(-1);
  }
  console.log("========== 结束文件拷贝 ==========");
};
