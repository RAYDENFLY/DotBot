const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
exports.run = async (client, message, args) => {
    message.success('test:SUCCESS')
}

exports.help = {
    name: "test",
    description: "DotBot Playground",
    usage: "[prefix]test",
    example: "d!test"
}

exports.slash = false

exports.conf = {
    aliases: ["rl"],
    cooldown: 10,
    developer: true,
    permissions: [""],
    needperms: [""],
}