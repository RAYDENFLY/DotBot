const Discord = require("discord.js")
module.exports = async (client, member) => {
    const channel = client.channels.cache.get('903598179633758249');
    const id = member.id
    const blacklist = new Discord.MessageEmbed()
        .setFooter("NEXACORP")
        .setColor("GREEN")
        .setDescription(`Welcome To our server <@${id}>`)
        .setTimestamp()
    if (member.guild.id === "901040545265225768") {
        channel.send({ embeds: [blacklist] })
    }
}