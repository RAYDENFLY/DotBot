const fetch = require("node-fetch");
const Discord = require('discord.js');
const { MessageActionRow, MessageButton } = require('discord.js')



exports.run = (client, message, args) => {
    const search = args[0];
    if (!search) return message.channel.send({
        embeds: [{
            "color": 0x4D5E94,
            "description": "❌ **What are you searching?**"

        }]
    });
    let version = args[1];
    if (!version) version = `stable`;

    fetch(`https://djsdocs.sorta.moe/v2/embed?src=${encodeURIComponent(version)}&q=${encodeURIComponent(search)}`)
        .then(res => res.json())
        .then(body => {
            if (body === null) return message.channel.send({
                embeds: [{
                    "color": 0x4D5E94,
                    "author": {
                        "name": "Discord.js Docs (master)",
                        "url": "https://discord.js.org/#/docs/main/master",
                        "icon_url": "https://discord.js.org/favicon.ico"
                    },
                    "title": "Search results:",
                    "description": "❌ **No results.**"
                }]
            });
            body.color = 0x4D5E94;
            message.channel.send({ embeds: [body] });
        })
        .catch(e => {
            message.channel.send({
                embeds: [{ "color": 0x4D5E94, "author": { "name": "Discord.js Docs (master)", "url": "https://discord.js.org/#/docs/main/master", "icon_url": "https://discord.js.org/favicon.ico" }, "title": "Search results:", "description": "No results." }]
            });
        });
}

exports.slash = false

exports.help = {
    name: "djs",
    description: "djs:DESC",
    usage: "djs <search>",
    example: "djs"
}

exports.conf = {
    aliases: ["discordjs"],
    cooldown: 0,
    permissions: [""],
    needperms: [""],
}