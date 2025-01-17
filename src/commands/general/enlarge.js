const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

exports.run = async (client, message, args) => {
    const emoji = args[0];
    if (!emoji) return message.error("enlarge:NOEMOT")

    let custom = Discord.Util.parseEmoji(emoji);
    const embed = new Discord.MessageEmbed()
        .setTitle(`Enlarge version of ${emoji}`)
        .setColor("RANDOM")
        .setFooter("DotBot")

    if (custom.id) {
        embed.setImage(`https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? "gif" : "png"}`);
        return message.channel.send({ embeds: [embed] });
    }
    else {
        let parsed = parse(emoji, { assetType: "png" });
        if (!parsed[0]) return message.error("enlarge:INVALID")

        embed.setImage(parsed[0].url);
        return message.channel.send({ embeds: [embed] });
    }
}

exports.help = {
    name: "enlarge",
    description: "enlarge:DESCRIPTION",
    usage: "enlarge <emoji>",
    example: "enlarge 🤨"
}

exports.slash = false

exports.conf = {
    aliases: [],
    cooldown: 5,
    permissions: [""],
    needperms: [""],
}