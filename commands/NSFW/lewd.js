const superagent = require("superagent");
const Discord = require("discord.js")
const lewdURL = "https://nekos.life/api/v2/img/lewd";

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  permissions: [""],
  needperms: [""],
};

exports.slash = false

exports.help = {
  name: 'lewd',
  description: 'LEWD!!!',
  usage: 'lewd'
};

const need = new Discord.MessageEmbed()
  .setFooter("DotBot")
  .setColor("YELLOW")
  .setDescription(`:warning:This channel is **SFW**`)
  .setTimestamp()

/**
 * 
 * @param {import("discord.js").Message} message
 */
exports.run = async (_, message) => {
  if (message.channel.nsfw) {
    const { body } = await superagent.get(lewdURL);
    return message.channel.send({ files: [{ attachment: body['url'], name: "lewd.png" }] });
  } else {
    message.channel.send({ embeds: [need] });

  }
}