const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const status = client.dbcache.afk
    try {

        //ignore AFK
        let reason = args.join(' ').toString() || "AFK";

        if (status.get(message.author.id) !== message.author.id) {
            message.replyT("afk:DONE", {
                reason: reason,
                author: message.author.tag
            })
            status.set(message.author.id, {
                "reason": reason,
                "time": Date.now()
            })
        } else {
            status.delete(message.author.id)
        };


    } catch (error) {
        return message.error("afk:ERROR", {
            error: error.message
        })
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
    description: 'afk:DESCRIPTION',
    usage: 'afk <reason>',
    example: 'd!afk Test'
}