let jsoning = require("jsoning");
let db = new jsoning("database/prefix.json");
exports.run = async (client, message, args) => {
    const prefix = args.join(" ");
    if (!prefix) return message.channel.send("pls input new prefix `prefix d!`");
    await db.set(message.guild.id, prefix)
    message.reply("Update prefix to `" + prefix + "`")
}
exports.conf = {
    aliases: [],
    developer: false,
    permissions: ["MANAGE_GUILD"],
    needperms: [""],
    cooldown: 4,
};

exports.slash = false

exports.help = { //lets load commands 
    name: 'prefix', //commands name
    description: 'change prefix this server :)', //commands discription
    usage: 'prefix <new prefix>' //how they work
}