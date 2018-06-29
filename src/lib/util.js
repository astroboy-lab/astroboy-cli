const fs = require('fs');

module.exports = {

  getProjectRoot() {
    return process.cwd();
  },

  getProjectConfig() {
    const filePath = this.getProjectRoot() + '/ast.json';
    if (fs.existsSync(filePath)) {
      return require(filePath);
    }
    return {};
  }

};