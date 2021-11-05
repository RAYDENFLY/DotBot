const discord = require('discord.js')
const jsoning = require("jsoning")

module.exports = async (client, message) => {
    var query2 = { user: message.author.id }
    let afk = client.db.collection.collection("afk"),
        authorstatus = await client.db.ifqueryhas("afk", query2),
        mentioned = message.mentions.members.first();

    if (mentioned) {
        var query = { user: mentioned.id };
        let data = await client.db.collection.collection("afk").find(query).toArray();
        let status = data[0].afk;
        console.log(data[0]);
        let waktu = data[0].time;
        let msTos = Date.now() - waktu
        let since = client.util.parseDur(msTos)

        client.db.ifqueryhas("afk", query).then(async (res) => {
            if (res) {
                message.reply(`**${mentioned.user.tag}** currently on AFK - **${since}** ago\n**Reason:**\n\`\`\`${status}\`\`\` `, { allowedMentions: { parse: [] } });
            }
            //send message but disable mention
        })
    };

    if (authorstatus) {
        message.reply(`INTI has revoked your AFK status!`)
        afk.deleteOne(query2, function (err, res) {
            if (err) throw err;
        })
    };
}