const config = require("../../config/configs.json")
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
const chalk = require('chalk');
const log = console.info;
module.exports = async (client, id) => {
    log(chalk.black.bgGreen(`Shard ${id} is ready!`))
}