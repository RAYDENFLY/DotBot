const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require('@discordjs/builders');
const superagent = require('superagent');
exports.run = async (client, message, args) => {
  const input = args.slice(0).join(" ")
  if (!input) return message.channel.send("pls insert a input example d!achievement Hello")
  const text = args.join("+");
  let status = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
  let rstatus = Math.floor(Math.random() * status.length);
  const e = new MessageEmbed()
    .setTitle("MineCraft achievement!")
    .setColor("RANDOM")
    .setImage(
      `https://minecraftskinstealer.com/achievement/${rstatus}/Achievement%20Get!/${text}`
    )
    .setFooter("Generate by https://minecraftskinstealer.com")
  message.channel.send({ embeds: [e] });
}

exports.help = {
  name: "achievement",
  description: "achievement Minecraft Meme",
  usage: ["achievement <text>"],
  example: ["achievement covid"]
}

exports.conf = {
  aliases: [],
  cooldown: 3,
  permissions: [""],
  needperms: [""],
  developer: false
}

exports.slash = {
  data: new SlashCommandBuilder()
    .setName('achievement')
    .setDescription('achievement Minecraft Meme')
    .addStringOption(option => option.setName('text').setDescription('text meme')),
  async execute(interaction, client, runs) {
    const vidio = interaction.options.getString('text');
    const text = vidio.split(' ').join('+')
    let status = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]
    let rstatus = Math.floor(Math.random() * status.length);
    const e = new MessageEmbed()
      .setTitle("MineCraft achievement!")
      .setColor("RANDOM")
      .setImage(
        `https://minecraftskinstealer.com/achievement/${rstatus}/Achievement%20Get!/${text}`
      )
      .setFooter("Generate by https://minecraftskinstealer.com")

    interaction.reply({ embeds: [e] })



  }
}