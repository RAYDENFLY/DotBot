const Discord = require('discord.js')
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');


exports.run = async (client, message, args) => {
    const danger = new Discord.MessageEmbed()
        .setFooter(reload1)
        .setTimestamp()
        .setColor('RED')
        .setDescription("**" + desc1 + "**")
    const success = new Discord.MessageEmbed()
        .setFooter(reload2)
        .setTimestamp()
        .setColor('GREEN')
        .setDescription("**" + desc2 + "**")
    const invite = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel('YES')
                .setCustomId('reloadyes')
                .setStyle('DANGER')
        )
        .addComponents(
            new MessageButton()
                .setLabel('NO')
                .setCustomId('reloadno')
                .setStyle('SUCCESS')
        )
    let reload1 = message.translate("reload:T1"),
        desc1 = message.translate("reload:D1")
    let reload2 = message.translate("reload:T2"),
        desc2 = message.translate("reload:D2"),
        confirm = message.translate("reload:CONFIRM")

    message.channel.send({ content: confirm, embeds: [danger], components: [invite] });
    const filter = i => client.config.bot.owner.includes(i.user.id)
    const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
    collector.on('collect', async i => {
        if (i.customId === 'reloadyes') {
            client.reload()
            await i.update({ embeds: [success], components: [] })
        }
        if (i.customId === 'reloadno') {
            await i.update({ content: "canceled", embeds: [], components: [] })
        }
    });
}

exports.help = {
    name: "reload",
    description: "reload:DESC",
    usage: "[prefix]reload",
    example: "d!reload"
}

exports.slash = false

exports.conf = {
    aliases: ["rl"],
    cooldown: 10,
    developer: true,
    permissions: [""],
    needperms: [""],
}