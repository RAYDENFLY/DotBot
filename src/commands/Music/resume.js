exports.run = async (client, message, args) => {
    const player = message.client.music.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;

    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");

    player.pause(false);
    return message.reply("Stop Music");
}

exports.slash = false
exports.conf = {
    aliases: ["rm"],
    developer: false,
    permissions: [""],
    needperms: ["CONNECT", "SPEAK"],
    cooldown: 4,
};

exports.help = { //lets load commands 
    name: 'resume', //commands name
    description: 'resume:DESC', //commands discription
    usage: 'resume' //how they work
}
