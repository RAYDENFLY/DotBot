const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require('discord.js');
let jsoning = require("jsoning");
let dbs = new jsoning("database/global.json");
let db = new jsoning("database/report.json");

exports.run = async (client, message, args) => {
    const prefix = await message.guild.data.prefix
    const reason = args.slice(0).join(" ")
    const owner = client.users.cache.get(client.config.bot.owner[0]);
    const Standar = new Discord.MessageEmbed()
        .setFooter("DotBot")
        .setColor("RED")
        .setTitle(message.translate("report:TITLE1"))
        .setDescription(message.translate("report:DESC1", {
            prefix: prefix,
        }))
    const success = new Discord.MessageEmbed()
        .setFooter("DotBot")
        .setColor("GREEN")
        .setTitle(message.translate("report:TITLE2"))
        .setDescription(message.translate("report:DESC2"))
    if (reason) {
        const id = message.author.id
        await db.push(id, reason)
        message.channel.send({ embeds: [success] })
        owner.send({ content: `Send by <@${message.author.id}>\nReason ${reason}` })
    } else {
        message.channel.send({ embeds: [Standar] })
    }

}

exports.help = {
    name: "report",
    description: "report:DESC",
    usage: "[prefix]report <reason>",
    example: "d!report commands help cant show up"
}

exports.slash = {
    data: new SlashCommandBuilder()
        .setName('report')
        .setDescription('report bot error')
        .addStringOption(option => option.setName('reason')
            .setDescription('Enter a reason')
            .setRequired(true)),
    async execute(interaction, client, runs) {
        const owner = client.users.cache.get(client.config.bot.owner[0]);
        const success = new Discord.MessageEmbed()
            .setFooter("DotBot")
            .setColor("GREEN")
            .setTitle("Thank you")
            .setDescription(`thanks for reporting the problem, we will add to the database and will fix the bot soon`)
        const id = interaction.user.id
        const reason = interaction.options.getString('reason');;
        await db.push(id, reason)
        interaction.reply({ embeds: [success] })
        owner.send(`Send by <@${interaction.user.id}>\nReason ${reason}`)

    }

}

exports.conf = {
    aliases: ["reports"],
    cooldown: 5,
    developer: false,
    permissions: [""],
    needperms: [""],
}