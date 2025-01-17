const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require('discord.js');

exports.run = async (client, message) => {
    const last = await client.commitshorthash()
    const lavalinkuptime = await client.util.msToTime(client.music.manager.nodes.get(client.config.lavalink.host).stats.uptime) || "Offline"
    const lastd = await client.commitsubject()
    const mss = await message.channel.send("Calculating...");
    message.channel.sendTyping()
    const promises = [
        client.shard.fetchClientValues('guilds.cache.size'),
        client.shard.fetchClientValues('channels.cache.size'),
        client.shard.fetchClientValues('users.cache.size'),
    ];
    let guild;
    let channel;
    let user;
    Promise.all(promises)
        .then(results => {
            guild = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
            channel = results[1].reduce((acc, guildCount) => acc + guildCount, 0);
            user = results[2].reduce((acc, memberCount) => acc + memberCount, 0);
        })
        .catch(console.error);
    let os = require('os'),
        cpuStat = require('cpu-stat')
    cpuStat.usagePercent(function (error, percent) {
        if (error) {
            return console.error(error)
        }

        let cores;
        let cpuModel;

        if (os.cpus().length === 0) {
            cores = "Mobile device"
            cpuModel = "Mobile device"
        } else {
            cores = os.cpus().length
            cpuModel = os.cpus()[0].model
        }
        const usage = formatBytes(process.memoryUsage().heapUsed)
        const total = formatBytes(os.totalmem())
        const free = formatBytes(os.freemem())
        const Node = process.version
        const CPU = percent.toFixed(2)
        const djs = client.package.dependencies["discord.js"];
        let author;

        try {
            const invite = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel('Developer')
                        .setCustomId('dev')
                        .setStyle('SUCCESS')
                )
            //.addComponents(
            //    new MessageButton()
            //   .setLabel('Source Code')
            //   .setURL('https://github.com/DemuraAIdev/DotBot')
            //    .setStyle('LINK')
            //)

            const developer = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Developer Status')
                .setAuthor('DemuraAI')
                .setDescription('```js\nName: ' + client.users.cache.get("754192220843802664").username + "#" + client.users.cache.get("754192220843802664").discriminator + '\nID: ' + client.users.cache.get("754192220843802664").id + '```')
                .setTimestamp()
                .setImage("https://cdn.discordapp.com/attachments/615704542562091028/901515267207749692/bot1.jpg")
                .setThumbnail(client.users.cache.get("754192220843802664").displayAvatarURL())
                .setFooter("Powered By DRM", message.author.displayAvatarURL());
            const utama = new Discord.MessageEmbed()
                .setColor('GREEN')
                .setTitle('Status Bot')
                .setAuthor('DemuraAI')
                .setDescription('```js\nName: ' + client.user.username + '\nID: ' + client.user.id + '```')
                .setThumbnail(client.user.displayAvatarURL())
                .addFields({ name: '**Version**', value: client.config.version, inline: true }, { name: '**Kernel**', value: "**ID** " + client.config.kernel + "\n**Version** " + client.config["kernel-version"], inline: true },)
                .addField('Uptime', `**Client** ${parseDur(client.uptime)}\n**Lavalink** ${lavalinkuptime}`, true)
                .addFields({ name: '**Ping**', value: `**Latency** ${mss.createdTimestamp - message.createdTimestamp}ms\n**API** ${Math.floor(client.ws.ping)}ms`, inline: true }, { name: '**Software**', value: `**Discord.js** ${djs}\n**Nodejs** ${Node}`, inline: true },)
                .addField('Server', `**Guild** ${guild}\n**User** ${user}\n **Channel** ${channel}`, true)
                .addField('System', `**CPU** ${cores} - ${cpuModel}\n**Used** ${CPU}%\n**RAM Usage** ${usage}\n**RAM** ${free} - ${total}`, true)
                .addField('Platfrom', `**${client.platfrom()}**`)
                .addField("\n**Last commit**\n", "`" + last + "` " + lastd)
                .setTimestamp()
                .setFooter("Powered By DRM", message.author.displayAvatarURL());
            author = message.author.id
            mss.edit({ content: `Done`, embeds: [utama], components: [invite] });
            const filter = i => i.customId === 'dev' && i.user.id === author
            const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
            collector.on('collect', async i => {
                if (i.customId === 'dev') {
                    await i.reply({ content: "Donate for give a coffee :coffee:", embeds: [developer], components: [] })
                }
            });


        } catch (error) {
            return message.channel.send(`Something went wrong: ${error.message}`);
        }
    })
}

exports.help = {
    name: "stats",
    description: "botinfo:DESC",
    usage: "stats",
    example: "stats"
};

exports.slash = false

exports.conf = {
    aliases: ["st"],
    cooldown: 5,
    developer: false,
    permissions: [""],
    needperms: [""],
};

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    let c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

function formatBytes(a, b) {
    if (0 == a) return "0 Bytes";
    let c = 1024,
        d = b || 2,
        e = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        f = Math.floor(Math.log(a) / Math.log(c));

    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + " " + e[f]
}

function parseDur(ms) {
    let seconds = ms / 1000,
        days = parseInt(seconds / 86400);
    seconds = seconds % 86400

    let hours = parseInt(seconds / 3600);
    seconds = seconds % 3600

    let minutes = parseInt(seconds / 60);
    seconds = parseInt(seconds % 60)

    if (days) {
        return `${days} day, ${hours} hours, ${minutes} minutes`
    } else if (hours) {
        return `${hours} hours, ${minutes} minutes, ${seconds} seconds`
    } else if (minutes) {
        return `${minutes} minutes, ${seconds} seconds`
    }

    return `${seconds} second(s)`
}