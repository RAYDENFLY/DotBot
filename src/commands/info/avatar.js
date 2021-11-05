const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
exports.run = (client, message, args) => {
  let name = client.users.cache.find(u => u.username === args[0])
  let member = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || client.users.cache.find(u => u.username === args[0])
    || message.author;
  let avatar = member.displayAvatarURL({ size: 1024, dynamic: true })


  const embed = new Discord.MessageEmbed()
    .setAuthor(message.author.username)
    .setTitle(`Avatar`)
    .setDescription("")
    .setImage(avatar)
    .setColor("RANDOM")
    .setFooter("DotBot")
  message.channel.send({ embeds: [embed] });
}

exports.slash = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Send avatar')
    .addUserOption(option => option
      .setName('targetavatar')
      .setDescription('Select a user')),
  async execute(interaction, client, args) {
    const member = interaction.options.getMember('targetavatar')
    let avatar = member.displayAvatarURL({ size: 1024, dynamic: true })
    const embed = new Discord.MessageEmbed()
      .setAuthor(interaction.author.username)
      .setTitle(`Avatar`)
      .setDescription("")
      .setImage(avatar)
      .setColor("RANDOM")
      .setFooter("DotBot")
    interaction.reply({ embeds: [embed] });
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  permissions: [""],
  needperms: [""],
};

exports.help = {
  name: 'avatar',
  description: 'Fetches a user\'s avatar.',
  usage: 'avatar <user>'
};