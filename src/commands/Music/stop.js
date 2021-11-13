exports.run = async (client, message, args) => {
    const player = message.client.music.manager.get(message.guild.id);
    if (!player) return message.reply("there is no player for this guild.");

    const { channel } = message.member.voice;

    if (!channel) return message.reply("you need to join a voice channel.");
    if (channel.id !== player.voiceChannel) return message.reply("you're not in the same voice channel.");

    player.destroy();
    return message.reply("Stop Music");
}

exports.slash = false
exports.conf = {
    aliases: ["s"],
    developer: false,
    permissions: [""],
    needperms: ["CONNECT", "SPEAK"],
    cooldown: 4,
};

exports.help = { //lets load commands 
    name: 'stop', //commands name
    description: 'stop:DESC', //commands discription
    usage: 'stop' //how they work
}