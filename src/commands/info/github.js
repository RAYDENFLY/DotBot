const Discord = require('discord.js');
const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');
exports.run = async (client, message, args) => {
    //get user profile github
    const repos = args[0]
    if (repos === undefined) {
        message.channel.send('Please provide a username');
        return;
    }
    const data = await axios.get(`https://api.github.com/users/${repos}`).catch(function (error) {
        if (error.response) {

            if (error.response.status === 404) {
                message.channel.send(`User not found`);
                return;
            };

        }
    });
    //if user not found
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(data.name.toString())
        .setURL(data.html_ur.toString())
        .setDescription(data.bio.toString())
        .setThumbnail(data.avatar_url.toString())
        .addField('Repositorios', data.public_repos.toString(), true)
        .addField('Followers', data.followers.toString(), true)
        .addField('Following', data.following.toString(), true)
        .addField('Created_at', data.created_at.toString(), true)
        .setTimestamp()
        .setFooter('DotBot - Github');
    message.channel.send({ embeds: [embed] });

}

exports.slash = false

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    permissions: [""],
    needperms: [""],
};

exports.help = {
    name: 'github',
    description: 'Get User github',
    usage: 'github <user>'
};