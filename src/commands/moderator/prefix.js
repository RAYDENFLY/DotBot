exports.run = async (client, message, args, data) => {
    const prefix = args[0];
    if (!prefix) return message.channel.send("pls input new prefix `prefix d!`");
    if (prefix.length > 10) return message.channel.send("prefix can't be longer than 10 characters");
    //set data.guilf.prefix to prefix
    message.guild.data.prefix = prefix;
    await message.guild.data.save();
    //send message
    message.channel.send(`prefix changed to ${prefix}`);
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