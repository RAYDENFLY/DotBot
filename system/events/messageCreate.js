const Discord = require("discord.js"),
    cooldowns = new Discord.Collection();
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
module.exports = async (client, message) => {
    const data = {}
    let prefix;
    if (message.author.bot || message.author === client.user) return;
    if (message.guild) {
        const guild = await client.findOrCreateGuild({ id: message.guild.id });
        message.guild.data = data.guild = guild;
    }
    if (data.guild) {
        prefix = data.guild.prefix;
    } else if (await db.has("prefix")) {
        prefix = await db.get("prefix")
    } else {
        prefix = client.config.bot.prefix;
    }
    require("../../src/addons/master")(client, message)
    require("../../src/addons/afk")(client, message)

    if (!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length || prefguild.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    let sender = message.author;
    let blacklist = require("../../database/blacklist.json").blacklist
    //let i = await db.get("bios")
    //if(i === "true") {

    //} false {

    //}

    if (blacklist.includes(message.author.id)) {
        const blacklist = new Discord.MessageEmbed()
            .setFooter("DotBot")
            .setColor("YELLOW")
            .setDescription("You in blacklist bot if there is a problem contact me <@754192220843802664>!\n```js\nID Blacklist: " + message.author.id + "```")
            .setTimestamp()
        return message.channel.send({ embeds: [blacklist] })
    }

    function plugin(name, input) {
        let plugin = client.plugin.get(name)

        return plugin.run(client, message, input);
    }


    message.flags = []
    while (args[0] && args[0][0] === "-") {
        message.flags.push(args.shift().slice(1));
    }


    let commandFile = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

    function runs(commands) {
        client.commands.get(commands).run(client, message, args);
        return client.commands.get(commands).help
    }

    if (!commandFile) return;
    if (commandFile.conf.developer === true) {
        const youarenot = new Discord.MessageEmbed()
            .setFooter("DotBot")
            .setColor("RED")
            .setDescription("You are not my **Developer**!")
            .setTimestamp()
        if (!client.config.bot.owner.includes(message.author.id)) return message.channel.send({ embeds: [youarenot] });
    }
    if (!message.member.permissions.has(commandFile.conf.permissions)) {
        const Require = new Discord.MessageEmbed()
            .setFooter("DotBot")
            .setColor("YELLOW")
            .setDescription(`Not Enough Permission!\n**Require: ${commandFile.conf.permissions} **`)
            .setTimestamp()
        return message.channel.send({ embeds: [Require] });
    }
    if (!message.guild.me.permissions.has(commandFile.conf.needperms)) {
        const need = new Discord.MessageEmbed()
            .setFooter("DotBot")
            .setColor("YELLOW")
            .setDescription(`The Bot need Permission!\n**Require: ${commandFile.conf.needperms} **`)
            .setTimestamp()
        return message.channel.send({ embeds: [need] });
    }

    if (!cooldowns.has(commandFile.help.name)) cooldowns.set(commandFile.help.name, new Discord.Collection());

    const member = message.member,
        now = Date.now(),
        timestamps = cooldowns.get(commandFile.help.name),
        cooldownAmount = (commandFile.conf.cooldown || 3) * 1000;

    if (!timestamps.has(member.id)) {
        if (!client.config.bot.owner.includes(message.author.id)) {
            timestamps.set(member.id, now);
        }
    } else {
        const expirationTime = timestamps.get(member.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(`Calm down dude, please wait **${timeLeft.toFixed(1)}** seconds to try the command again.`);
        }

        timestamps.set(member.id, now);
        setTimeout(() => timestamps.delete(member.id), cooldownAmount); // This will delete the cooldown from the user by itself.
    }

    try {
        if (!commandFile) return;
        commandFile.run(client, message, args, runs, plugin, data);
    } catch (error) {
        console.log(error);
        message.channel.send(`There was an error while executing this command! ${error.message}`)

    } finally {
        //check current shard
        console.info(`[${client.shard.ids[0]}]: ${sender.tag} ran a command: ${cmd}`);
    }
}