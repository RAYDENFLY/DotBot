const Discord = require("discord.js")
exports.run = async (client, message, args) => {
    let CheckNode = client.music.manager.nodes.get(client.config.lavalink.host);
    if (!CheckNode || !CheckNode.connected) {
        return message.error("play:CANTCONNECT")
    }
    if (!message.member.voice.channel) return message.reply(message.translate("play:NOTINVOICE"));
    if (!args.length) return message.reply(message.translate("play:NOARGS"));

    const player = client.music.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
    });
    let SongAddedEmbed = new Discord.MessageEmbed().setColor("RANDOM");


    let SearchString = args.join(" ");
    if (player.state != "CONNECTED") await player.connect();
    const res = await player.search(SearchString, message.author);


    switch (res.loadType) {

        case 'PLAYLIST_LOADED':
            player.queue.add(res.tracks);

            if (!player.playing && !player.paused && player.queue.totalSize === res.tracks.length) player.play();
            return message.reply(`enqueuing playlist \`${res.playlist.name}\` with ${res.tracks.length} tracks.`);
        case 'NO_MATCHES':
            if (!player.queue.current) player.destroy()
            return message.reply('there were no results found.')
        case 'LOAD_FAILED':
            if (!player.queue.current) player.destroy();
            throw res.exception;
        default:
            player.queue.add(res.tracks[0]);

            player.play()
            return message.success("play:PLAY", {
                title: res.tracks[0].title,
                url: res.tracks[0].uri
            });



    }


}
exports.slash = false
exports.conf = {
    aliases: ["p"],
    developer: false,
    permissions: [""],
    needperms: ["CONNECT", "SPEAK"],
    cooldown: 4,
};

exports.help = { //lets load commands 
    name: 'play', //commands name
    description: 'Play music for free :)', //commands discription
    usage: 'play <url/name>' //how they work
}