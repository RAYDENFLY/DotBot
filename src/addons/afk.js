const discord = require('discord.js')
const jsoning = require("jsoning")

module.exports = async (client, message) => {
    var query2 = { user: message.author.id }
    let afk = client.db.collection.collection("afk"),
        authorstatus = await client.db.ifqueryhas("afk", query2),
        mentioned = message.mentions.members.first();

    if (mentioned) {
        var query = { user: mentioned.id };
        if (await client.db.ifqueryhas("afk", query)) {
            let data = await client.db.collection.collection("afk").find(query).toArray();
            var afkreason = data[0].afk;
            let waktu = data[0].time;
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

    if (authorstatus) {
        message.reply(`INTI has revoked your AFK status!`)
        afk.deleteOne(query2, function (err, res) {
            if (err) throw err;
        })
    };
}