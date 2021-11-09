const Discord = require('discord.js');
const axios = require('axios');
const { SlashCommandBuilder } = require('@discordjs/builders');
exports.run = async (client, message, args) => {
    const repos = args[0]
    if (!repos) return message.channel.send('Please provide a repository name')
    const repo = await axios.get(`https://api.github.com/repos/${repos}`).catch(function (error) {
        if (error.response) {
            if (error.response.status === 404) {
                return message.channel.send('Repository not found')
            }

        }
    });
    //if repo not found
    const embed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle(`${repo.data.name}`)
        .setURL(`${repo.data.html_url}`)
        .setDescription(`${repo.data.description}`)
        .addField('Language', `${repo.data.language.toString()}`, true)
        .addField('Stars', `${repo.data.stargazers_count.toString()}`, true)
        .addField('Forks', `${repo.data.forks_count.toString()}`, true)
        .addField('Watchers', `${repo.data.watchers_count.toString()}`, true)
        .addField('Open Issues', `${repo.data.open_issues_count.toString()}`, true)
        .addField('License', `${repo.data.license.name.toString()}`, true)
        .setFooter(`DotBot - GIthub`, message.author.displayAvatarURL())
        .setTimestamp();
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
    name: 'repo',
    description: 'Get repo github',
    usage: 'repo <name>'
};