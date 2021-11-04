const discord = require('discord.js')
const db = require('quick.db')
const jsoning = require("jsoning")

module.exports = async (client, message) => {
    let afk = new jsoning("database/afk.json"),
        authorstatus = await afk.has(message.author.id),
        mentioned = message.mentions.members.first();

    if (mentioned) {
        let status = await afk.get(`${mentioned.id}.alasan`);
        let waktu = await afk.get(`${mentioned.id}.time`)

        let msTos = Date.now() - waktu
        let since = client.util.parseDur(msTos)
        if (status) {
            message.reply(`**${mentioned.user.tag}** currently on AFK - **${since}** ago\n**Reason:**\n\`\`\`${status}\`\`\` `, { disableMentions: 'all' }
            );
        }
    };

    if (authorstatus) {
        message.reply(`INTI has revoked your AFK status!`)
        afk.delete(message.author.id)
    };
}