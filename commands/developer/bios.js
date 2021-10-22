const Discord = require("discord.js")
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
exports.run = async (client, message, args, runs, plugin) => {
    const Bios = new Discord.MessageEmbed()
        .setFooter(`BIOS`)
        .setTimestamp()
        .setColor('RED')
        .setDescription("**BIOS MODE ACTIVATED**")
    message.channel.send({ embeds: [Bios] })
    db.set("bios", "true")
}

exports.help = {
    name: "bios",
    description: "BIOS mENU.",
    usage: "bios ",
    example: "bios"
}

exports.slash = false

exports.conf = {
    aliases: ["biosmenu"],
    permissions: [""],
    needperms: [""],
    developer: true
}