
const chalk = require('chalk');
const log = console.info;
module.exports = async (client, id) => {
    log(chalk.black.bgGreen(`Shard ${id} is ready!`))
}