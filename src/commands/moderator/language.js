exports.run = async (client, message, args) => {
    const language = client.languages.find((l) => l.name === args[0] || l.aliases.includes(args[0]));

    if (!args[0] || !language) {
        //send error message
        return message.error("lang:NOTFOUND", {
            list: client.languages.map((l) => "`" + l.name + "`").join(", ")
        });
    }

    message.guild.data.lang = language.name;
    await message.guild.data.save();

    return message.success("lang:SUCCESS")
}
exports.conf = {
    aliases: ["lang"],
    developer: false,
    permissions: ["MANAGE_GUILD"],
    needperms: [""],
    cooldown: 4,
};

exports.slash = false

exports.help = { //lets load commands 
    name: 'language', //commands name
    description: 'lang:DESC', //commands discription
    usage: 'prefix <language en-US id-ID>' //how they work
}