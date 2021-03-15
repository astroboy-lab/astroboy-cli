const program = require('commander');
const chalk = require('chalk');
const pkg = require('./package.json');

const plugins = require('./src/plugins');

function registerPlugin(plugin) {
  let pro = program
    .command(plugin.name)
    .description(plugin.description);
  if (plugin.options) {
    for (let i = 0; i < plugin.options.length; i++) {
      pro.option(plugin.options[i][0], plugin.options[i][1]);
    }
  }
  pro.action(plugin.action)
    .on('--help', plugin.help);
}

plugins.forEach(plugin => {
  registerPlugin(plugin);
});

program
  .version(pkg.version);

program
  .command('*')
  .action((commandName) => {
    console.log(chalk.red(`命令 ${commandName} 不存在！`));
  });

program
  .parse(process.argv);

if (program.args.length === 0) {
  program.outputHelp();
}
