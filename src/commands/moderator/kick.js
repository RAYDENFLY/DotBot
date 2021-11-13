const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const danger = new Discord.MessageEmbed()
    .setFooter(`KICK Commands`)
    .setTimestamp()
    .setColor('RED')
    .setDescription("**Kick this Memeber?**")
const com = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setLabel('YES')
            .setCustomId('kickyes')
            .setStyle('DANGER')
    )
    .addComponents(
        new MessageButton()
            .setLabel('NO')
            .setCustomId('kickno')
            .setStyle('SUCCESS')
    )

exports.run = async (client, message, args) => {
    const members = message.author;
    if (message.mentions.users.first() === undefined) return message.reply("You didn't mention the user to Kick!")
    const user = message.mentions.users.first().id;
    const reason = args.slice(1).join(" ") || "No reason"
    // If we have a user mentioned
    const success = new Discord.MessageEmbed()
        .setFooter(`Successfully kick`)
        .setTimestamp()
        .setColor('GREEN')
        .setDescription(`**Successfully kick** <@${user}>`)
    const dm = new Discord.MessageEmbed()
        .setFooter(message.guild.name)
        .setTimestamp()
        .setColor('GREEN')
        .setDescription(`You get kick in server **${message.guild.name}** because \`${reason}\` `)

    if (user) {
        // Now we get the member from the user
        const member = message.guild.members.cache.get(user);
        // If the member is in the guild
        if (member) {
            message.channel.send({ content: `Confirm kick`, embeds: [danger], components: [com] });
            const filter = i => i.user.id === message.author.id;
            const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
            collector.on('collect', async i => {
                if (i.customId === 'kickyes') {
                    member
                        .kick({
                            reason: reason,
                        })
                        .then(() => {
                            member.send({ embeds: [dm] })
                            i.update({ embeds: [success], components: [] })

                        })
                        .catch(err => {
                            i.reply('I was unable to kick the member');
                        });
                }
                if (i.customId === 'kickno') {
                    await i.update({ content: "canceled", embeds: [], components: [] })
                }
            })
        } else {
            // The mentioned user isn't in this guild
            i.reply("That user isn't in this guild!");
        }
    } else {
        message.reply("You didn't mention the user to kick!");
    }
}

exports.slash = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick member')
        .addUserOption(option => option
            .setName('target')
            .setDescription('Select a user')
            .setRequired(true))
        .addStringOption(option => option.setName('reason').setDescription('Reason kick')),
    async execute(interaction, client, args) {

        const members = interaction.options.getMember('target').id
        const member = interaction.guild.members.cache.get(members);
        interaction.reply({ content: `Confirm kick`, embeds: [danger], components: [com] });
        const filter = i => i.user.id === interaction.user.id;
        const collector = interaction.channel.createMessageComponentCollector({ filter, max: 1 });
        const reason = interaction.options.getString('input') || "No reason"
        const success = new Discord.MessageEmbed()
            .setFooter(`Successfully kick`)
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`**Successfully kick** ${member}`)
        const dm = new Discord.MessageEmbed()
            .setFooter(interaction.guild.name)
            .setTimestamp()
            .setColor('GREEN')
            .setDescription(`You get kick in server **${interaction.guild.name}** because \`${reason}\` `)
        collector.on('collect', async i => {
            if (i.customId === 'kickyes') {
                member
                    .kick({
                        reason: reason,
                    })
                    .then(() => {
                        member.send({ embeds: [dm] })
                        i.update({ embeds: [success], components: [] })

                    })
                    .catch(err => {
                        i.reply('I was unable to kick the member');
                    });
            }
            if (i.customId === 'kickno') {
                await i.update({ content: "canceled", embeds: [], components: [] })
            }
        })
    }
}

exports.conf = {
    aliases: [],
    developer: false,
    permissions: ["KICK_MEMBERS"],
    needperms: ["KICK_MEMBERS"],
    cooldown: 4,
};

exports.help = { //lets load commands 
    name: 'kick', //commands name
    description: 'kick:DESC', //commands discription
    usage: 'kick <user> <reason>' //how they work
}