const discord = require('discord.js')
const jsoning = require("jsoning")

module.exports = async (client, message) => {
    let afk = client.dbcache.afk,
        mentioned = message.mentions.members.first();

    if (mentioned) {
        if (afk.get(mentioned.id)) {
            var afkreason = afk.get(mentioned.id).reason;
            let waktu = afk.get(mentioned.id).time;
            let msTos = Date.now() - waktu
            let since = client.util.parseDur(msTos)
            var afkembed = new discord.MessageEmbed()
                .setDescription(`**${mentioned} is AFK**\nReason: ${afkreason}`)
                .setColor("#ff0000")
                .setFooter(`AFK since ${since}`)
            message.channel.send({
                embeds: [afkembed],
                allowedMentions: { parse: [] } // This is to prevent the bot from mentioning the user
            });
        } else return;

    };

    if (afk.get(message.author.id)) {
        message.reply(`INTI has revoked your AFK status!`)
        afk.delete(message.author.id)
    };
}