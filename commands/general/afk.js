const Discord = require('discord.js');
const jsoning = require("jsoning")

exports.run = async (client, message, args) => {
    try {
        const status = new jsoning("database/afk.json");
        let afk = await status.has(message.author.id);

        //ignore AFK
        let reason = args.join(' ').toString();

        if (!afk) {
            message.channel.send(`**${message.author.tag}** telah AFK! \n**Alasan:** ${reason ? reason : "AFK"}`, { disableMentions: 'all' })
            setTimeout(() => {
                status.set(message.author.id, {
                    alasan: reason || 'AFK', waktu: Date.now()
                });
            }, 4000);

        } else {
            status.delete(message.author.id);
        };


    } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
        // Restart the bot as usual.
    };
};

exports.slash = false

exports.conf = {
    aliases: ["away"],
    cooldown: 5,
    permissions: [""],
    needperms: [""],
}

exports.help = {
    name: 'afk',
    description: 'menambahkan status afk pada user',
    usage: 'k!avatar [mention/userid/server]',
    example: 'k!avatar @juned | k!avatar 458342161474387999 | k!avatar server'
}