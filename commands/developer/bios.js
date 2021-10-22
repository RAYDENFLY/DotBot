exports.run = async (client, message, args, runs, plugin) => {
    const Bios = new Discord.MessageEmbed()
        .setFooter(`BIOS`)
        .setTimestamp()
        .setColor('RED')
        .setDescription("**BIOS ACTIVATED**")
    message.channel.send({ embeds: [Bios] })
}

exports.help = {
    name: "eval",
    description: "Evaluate some code.",
    usage: "eval <code>",
    example: "eval client.commands"
}

exports.slash = false

exports.conf = {
    aliases: ["e"],
    permissions: [""],
    needperms: [""],
    developer: true
}