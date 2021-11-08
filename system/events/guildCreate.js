const { time } = require('@discordjs/builders');
const moment = require("moment")
const date = new Date();
const timeString = time(date);
module.exports = async (client, guild) => {
        console.info("Joined a new guild: " + guild.name);
        const global = await client.createnew()
        const guildcount = client.guilds.cache.size.toLocaleString()
        global.guildcount = guildcount
        global.save()
}