const Discord = require("discord.js")
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
exports.run = async (client, message, args, runs, plugin) => {
    const i = await db.get("bios")
    const Bios = new Discord.MessageEmbed()
        .setFooter(`BIOS`)
        .setTimestamp()
        .setColor('RED')
        .setDescription("**BIOS MODE ACTIVATED**")
    const nonBios = new Discord.MessageEmbed()
        .setFooter(`BIOS`)
        .setTimestamp()
        .setColor('GREEN')
        .setDescription("**BIOS MODE DEACTIVATED**")
    if (i === "true") {
        message.channel.send({ embeds: [nonBios] })
        await db.set("bios", "false")
    } else {
        message.channel.send({ embeds: [Bios] })
        await db.set("bios", "true")
    }
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