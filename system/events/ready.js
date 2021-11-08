const config = require("../../config/configs.json")
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
const chalk = require('chalk');
const log = console.info;
module.exports = async (client) => {
    log(chalk.black.bgGreen(`${client.user.username} is now ready to be online.`))
    client.music.manager.init(client.user.id);
    let globalprefix = await db.get("prefix")
    let prefix = globalprefix || client.config.bot.prefix;
    const global = await client.createnew()
    const guild = client.guilds.cache.size.toLocaleString()
    const user = client.users.cache.size.toLocaleString()
    global.guildcount = guild
    global.usercount = user
    global.save()

    function randomStatus() {
        let status = [config.kernel, config["kernel-version"], "My Prefix is " + prefix]
        let rstatus = Math.floor(Math.random() * status.length);

        client.user.setActivity(status[rstatus], { type: "COMPETING" });
    }
    setInterval(randomStatus, 10000);
}