const Discord = require('discord.js');
const moment = require("moment");

const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline"
};

exports.run = (client, message, args) => {
    var permissions = [];
    var acknowledgements = 'None';

    const user = message.mentions.users.first() || message.author;
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || client.users.cache.find(u => u.username === args[0]) || message.member;

    if (member.permissions.has("KICK_MEMBERS")) {
        permissions.push("Kick Members");
    }

    if (member.permissions.has("BAN_MEMBERS")) {
        permissions.push("Ban Members");
    }

    if (member.permissions.has("ADMINISTRATOR")) {
        permissions.push("Administrator");
    }

    if (member.permissions.has("MANAGE_MESSAGES")) {
        permissions.push("Manage Messages");
    }

    if (member.permissions.has("MANAGE_CHANNELS")) {
        permissions.push("Manage Channels");
    }

    if (member.permissions.has("MENTION_EVERYONE")) {
        permissions.push("Mention Everyone");
    }

    if (member.permissions.has("MANAGE_NICKNAMES")) {
        permissions.push("Manage Nicknames");
    }

    if (member.permissions.has("MANAGE_ROLES")) {
        permissions.push("Manage Roles");
    }

    if (member.permissions.has("MANAGE_WEBHOOKS")) {
        permissions.push("Manage Webhooks");
    }

    if (member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) {
        permissions.push("Manage Emojis");
    }

    if (permissions.length == 0) {
        permissions.push("No Key Permissions Found");
    }

    if (member.user.id == message.guild.ownerId) {
        acknowledgements = 'Server Owner';
    }
    if (client.config.bot.owner.includes(member.user.id)) {
        acknowledgements = 'My Developer';
    }
    if (member.user.id == client.user.id) {
        acknowledgements = 'its me';
    }

    if (member.presence === null) {
        presence = "offline"
    } else {
        presence = member.presence.status
    }


    const embed = new Discord.MessageEmbed()
        .setDescription(`<@${member.user.id}>`)
        .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
        .setTitle("Whois?")
        .setColor("GREEN")
        .setFooter(`DotBot`)
        .setThumbnail(member.user.displayAvatarURL())
        .setTimestamp()
        .addField("Status", `${status[presence]}`, true)
        .addField('Joined at: ', `${moment(member.joinedAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField("Created at: ", `${moment(message.author.createdAt).format("dddd, MMMM Do YYYY, HH:mm:ss")}`, true)
        .addField(`Roles [${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).length}]`, `${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(" **|** ") || "No Roles"}`, true)
        .addField("Permissions: ", `${permissions.join(', ')}`, true)
        .addField("Acknowledgements: ", `${acknowledgements}`, true);

    message.channel.send({ embeds: [embed] });

}

exports.slash = false

exports.help = {
    name: "whois",
    description: "get info about a user",
    usage: "whois [@user]",
    example: "user <@529493423556919296>"
}

exports.conf = {
    aliases: ["userinfo"],
    cooldown: 0,
    permissions: [""],
    needperms: [""],
}