module.exports = async (client, guild) => {
        console.info("Joined a new guild: " + guild.name);
        const promises = [
                client.shard.fetchClientValues('guilds.cache.size'),
                client.shard.fetchClientValues('channels.cache.size'),
                client.shard.fetchClientValues('users.cache.size'),
        ];
        let guilds
        let channel
        let user
        Promise.all(promises)
                .then(results => {
                        guilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                        channel = results[1].reduce((acc, guildCount) => acc + guildCount, 0);
                        user = results[2].reduce((acc, memberCount) => acc + memberCount, 0);
                })
                .catch(console.error);
        const global = await client.createnew()
        global.guildcount = guilds
        global.usercount = user
        global.save()
}