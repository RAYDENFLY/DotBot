const { MessageActionRow, MessageButton } = require('discord.js'), { post } = require("node-superfetch");
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

const embed = new Discord.MessageEmbed()
    .setFooter(`DANGER ZONE`)
    .setTimestamp()
    .setColor('RED')
    .setDescription("**Restart**")
const danger = new Discord.MessageEmbed()
    .setFooter(`Restart`)
    .setTimestamp()
    .setColor('YELLOW')
    .setDescription("**Are you sure?**")
// This command is super frickin' dangerous. Make it only visible and usable for you only, or give it to someone you trust.

const invite = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('YES')
            .setCustomId('restartyes')
            .setStyle('DANGER')
    )
    .addComponents(
        new MessageButton()
            .setLabel('NO')
            .setCustomId('restartno')
            .setStyle('SUCCESS')
    )


exports.run = async (client, message, args) => {
    let bot = client.config.bot;
    let prefix = bot.prefix;
    let nama = bot.name;
    let id = client.user.id

    message.channel.send({ content: `Confirm restart`, embeds: [danger], components: [invite] });
    const filter = i => client.config.bot.owner.includes(i.user.id);
    const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });

    collector.on('collect', async i => {
        if (i.customId === 'restartyes') {
            await i.update({ content: "Bye", embeds: [embed], components: [] })
            client.shard.respawnAll()
        }
        if (i.customId === 'restartno') {
            await i.update({ content: "canceled", embeds: [], components: [] })
        }
    });

}


exports.help = {
    name: "restart",
    description: "restart:DESC",
    usage: "[prefix]restart",
    example: "[prefix]restart"
}

exports.slash = false

exports.conf = {
    aliases: ["kill"],
    developer: true,
    permissions: [""],
    needperms: [""],
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}