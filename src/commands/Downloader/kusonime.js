const Discord = require('discord.js');

exports.run = async (client, message, args) => {

    try {
        let query = args.join(' ');
        if (!query) return message.reply('Masukan nama anime!');

        if (query.startsWith('https')) await client.kusonime.getDetail(query.replace('https://kusonime.com/', ''), message);
        else await client.kusonime.getBySearch(query, message);
    } catch (error) {
        return console.log(error);
        // Restart the bot as usual. 
    }
}

exports.conf = {
    aliases: ['kuso', 'kusoni', 'kusonime'],
    cooldown: 60,
    permissions: [""],
    needperms: [""],
}

exports.slash = false

exports.help = {
    name: 'kusonime',
    description: 'kusonime:DESC',
    usage: 'kusonime <query>',
    example: 'kusonime <query>'
}