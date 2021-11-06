const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const status = client.dbcache.afk
    try {

        //ignore AFK
        let reason = args.join(' ').toString() || "AFK";

        if (status.get(message.author.id) !== message.author.id) {
            message.reply({ content: `**${message.author.tag}** telah AFK! \n**Alasan:** ${reason ? reason : "AFK"}`, allowedMentions: { parse: [] } })
            status.set(message.author.id, {
                "reason": reason,
                "time": Date.now()
            })
        } else {
            status.delete(message.author.id)
        };


    } catch (error) {
        return message.channel.send(`Something went wrong: ${error.message}`);
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