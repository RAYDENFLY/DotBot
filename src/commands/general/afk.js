const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    const status = client.db.collection.collection("afk")
    try {
        let struktur = {
            user: message.author.id,
            afk: args.join(" ") || "No reason",
            time: Date.now()
        }
        let afk = await client.db.ifqueryhas("afk", struktur)

        //ignore AFK
        let reason = args.join(' ').toString();

        if (!afk) {
            message.reply({ content: `**${message.author.tag}** telah AFK! \n**Alasan:** ${reason ? reason : "AFK"}`, allowedMentions: { parse: [] } })
            setTimeout(() => {
                status.insertOne(struktur, function (err, res) {
                    if (err) throw err;
                });
            }, 4000);

        } else {
            status.deleteOne(struktur, function (err, res) {
                if (err) throw err;
            })
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