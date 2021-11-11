const { Manager } = require("erela.js");
const config = require("../../config/configs.json")
const chalk = require('chalk');
const Spotify = require("erela.js-spotify");
const log = console.info;
const clientID = config.spotify.client_id
const clientSecret = config.spotify.secret
const hostl = config.lavalink.host || "youshallnotpass"
const portl = config.lavalink.port || 80
const passwordl = config.lavalink.password || "lava.link"
class drmusic {
    constructor(client) {
        this.client = client;
        this.manager = new Manager({
            nodes: [
                {
                    id: "Main",
                    host: hostl,
                    port: portl,
                    password: passwordl,
                },
                {
                    id: "Main",
                    host: "lava.link",
                    port: 80,
                    password: "youshallnotpass",
                },
            ],
            plugins: [
                // plugin spotify you can disable it.s
                new Spotify({
                    clientID,
                    clientSecret,
                    convertUnresolved: true
                })
            ],
            send(id, payload) {
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            },
        })
            .on("nodeConnect", node => log(chalk.black.bgGreen(`Connected Lavalink host ${node.options.identifier}`)))
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