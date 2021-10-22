const Discord = require('discord.js');
const axios = require('axios');

exports.run = async (client, message, args) => {

  try {

    let query = args.join(' ');
    if (!query) return message.reply('insert a request first!');

    if (query.startsWith('https')) query = query.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|\&v(?:i)?=))([^#\&\?]*).*/)[1];
    let data = await axios.get(`https://katowo.glitch.me/api/info/${query}`); data = data.data;


    let embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(data.info.title)
      .addField('Duration', client.util.parseDur(data.info.lengthSeconds * 1000), true)
      .addField('ID', data.info.videoId, true)
      .setImage(data.info.thumbnail.thumbnails.pop().url)
      .setFooter("DotBot")

    await message.channel.send({ embeds: [embed] });


    let tempRes = { default: [], audioOnly: [], videoOnly: [] };
    for (i = 0; i < data.video.length; i++) {
      tempRes.default[i] = `[${i + 1}. ${data.video[i].qualityLabel}](https://katowo.glitch.me/api/download/${query}/default/${data.video[i].qualityLabel})`;
    }

    for (i = 0; i < data.videoOnly.length; i++) {
      tempRes.videoOnly[i] = `[${i + 1}. ${data.videoOnly[i].qualityLabel}](https://katowo.glitch.me/api/download/${query}/videoOnly/${data.videoOnly[i].qualityLabel})`;
    };

    tempRes.audioOnly[0] = `[${1}. ${data.audioOnly.shift().audioQuality}](https://katowo.glitch.me/api/download/${query}/audioOnly/default)`;

    let embede = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('Available resolutions')
      .setDescription(`**Videos with audio**\n${tempRes.default.join('\n')}\n\n**Audio Only**\n${tempRes.audioOnly.join('\n')}\n\n**Video Only**\n${tempRes.videoOnly.join('\n')}`)

    await message.channel.send({ embeds: [embede] })


  } catch (error) {
    console.log(error)
    return message.channel.send(`Something went wrong: ${error.message}`);
    // Restart the bot as usual.
  }
}

exports.conf = {
  aliases: ["ytd"],
  cooldown: 5,
  permissions: [""],
  needperms: [""],
}

exports.slash = false

exports.help = {
  name: 'youtube',
  description: 'download video di youtube',
  usage: 'k!ytdl <link||id>',
  example: 'k!about c9K1tiCUMyY'
}