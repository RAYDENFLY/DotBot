exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.reply("you need to join a voice channel.");
    if (!args.length) return message.reply("you need to give me a URL or a search term.");

    const search = args.join(" ");
    let res;

    try {
        // Search for tracks using a query or url, using a query searches youtube automatically and the track requester object
        res = await client.music.manager.search(search, message.author);
        // Check the load type as this command is not that advanced for basics
        if (res.loadType === "LOAD_FAILED") throw res.exception;
        else if (res.loadType === "PLAYLIST_LOADED") throw { message: "Playlists are not supported with this command." };
    } catch (err) {
        return message.reply(`there was an error while searching: ${err.message}`);
    }

    if (res.loadType === "NO_MATCHES") return message.reply("there was no tracks found with that query.");

    // Create the player 
    const player = client.music.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id,
    });

    // Connect to the voice channel and add the track to the queue
    player.connect();
    player.queue.add(res.tracks[0]);

    // Checks if the client should play the track if it's the first one added
    if (!player.playing && !player.paused && !player.queue.size) player.play()

    return message.reply(`enqueuing ${res.tracks[0].title}.`);

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