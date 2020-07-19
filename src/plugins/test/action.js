const { runCLI } = require('jest')
const { join } = require('path')
const Util = require('../../lib/util');

const ROOT = Util.getProjectRoot()
const JEST_CONFIG_FILE = join(__dirname, './jest.config.js')

module.exports = (command) => {

  const config = {
    rootDir: ROOT,
    watch: command.watch,
    config: JEST_CONFIG_FILE,
    clearCache: command.clearCache,
  };

  runCLI(config, [ROOT])
    .then(response => {
      if (!response.results.success && !command.watch) {
        process.exit(1);
      }
    })
    .catch(err => {
      console.log(err);

      if (!command.watch) {
        process.exit(1);
      }
    });
}
