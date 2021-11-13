const { VoiceState, MessageEmbed } = require("discord.js");

module.exports = async (client, oldState, newState) => {
    const guild = newState.guild.id;
    const player = client.Manager.get(guildId);
    if (!player || player.state !== "CONNECTED") return;

    stateChange.members = stateChange.channel.members.filter(
        (member) => !member.user.bot
    );
    //TODO: Add a check for if the user is in the voice channel
}