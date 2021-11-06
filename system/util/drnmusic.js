const { Manager } = require("erela.js");
const config = require("../../config/configs.json")
const chalk = require('chalk');
const log = console.info;
class drmusic {
    constructor(client) {
        this.client = client;
        this.manager = new Manager({
            nodes: [
                {
                    host: config.lavalink.host,
                    port: config.lavalink.port,
                    password: config.lavalink.password,
                },
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        })
            .on("nodeConnect", node => log(chalk.black.bgGreen(`Connected Lavalink Node ${node.options.identifier}`)))
            .on("nodeError", (node, error) => console.error(`Cant connect Lavalink host ${node.options.identifier} had an error: ${error.message}`))
            .on("trackStart", (player, track) => {
                client.channels.cache
                    .get(player.textChannel)
                    .send(`Now playing: ${track.title}`);
            })
            .on("queueEnd", (player) => {
                client.channels.cache
                    .get(player.textChannel)
                    .send("Queue has ended.");

                player.destroy();
            });
    }
}
module.exports = drmusic;