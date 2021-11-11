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
    let guilds
    let channel
    let user
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.fetchClientValues('channels.cache.size'),
        client.shard.fetchClientValues('users.cache.size'),
    ];
    Promise.all(promises)
        .then(results => {
            guilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            channel = results[1].reduce((acc, guildCount) => acc + guildCount, 0);
            user = results[2].reduce((acc, memberCount) => acc + memberCount, 0);
        })
        .catch(console.error);
    const global = await client.createnew()
    global.guildcount = guilds
    global.usercount = user
    global.save()

    function randomStatus() {
        let status = [config.kernel, config["kernel-version"], "My Prefix is " + prefix]
        let rstatus = Math.floor(Math.random() * status.length);

        client.user.setActivity(status[rstatus], { type: "COMPETING" });
    }
    setInterval(randomStatus, 10000);
}