const Discord = require('discord.js'); //npm i discord.js
const superagent = require('superagent'); //npm i superagent

exports.run = async (client, message, args) => { //lets started your commands script
  let member = message.mentions.users.first() || client.users.cache.find(u => u.username === args[0])
  if (!args[0]) return message.reply("you almost mention someone to pat them")
  //if no one is mentions , lets reply as

  if (member.id === "754192220843802664") return message.channel.send('Lol You can pat my developer '); //lets make a some a some funny reply |you can set a random emoji|
  const { body } = await superagent
    .get("https://nekos.life/api/pat"); //lets see wut we went

  const embed = new Discord.MessageEmbed() //onec Discordjs is updated to 12.2.0 , richembed is removed ! they replaced now as MessageEmbed
    .setColor("#3bb9ff")
    .setTitle(`i see that is, ${message.author.username} patted ${member.username}`) //lets reply as
    .setImage(body.url) // lets showing pat (GIF}
    .setFooter(`DotBot`); //your personnel Footer
  message.channel.send({ embeds: [embed] })
};

exports.slash = false

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
  permissions: [""],
  needperms: [""],
};

exports.help = { //lets load commands
  name: 'pat', //commands name
  description: 'Pats anyone you went', //commands description
  usage: 'pat', // how they work
  example: 'pat <@otaku#--->' //here a some example about how they work
};