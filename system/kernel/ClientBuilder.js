const { Collection, Client } = require("discord.js"),
    Discord = require("discord.js"),
    fs = require("fs");
const Kusonime = require('../util/kusonime');
const Osu = require('../util/osu');
const { getLastCommit } = require('git-last-commit');
const config = require("../../config/configs.json")
const Db = require("../util/database")
const { Manager } = require("erela.js");
const utilpath = require("./Util")
const chalk = require('chalk');
const log = console.info;
module.exports = class system extends Client {
    constructor(options) {
        super(options)
        this.connections = new Map();
        this.CommandsRan = 0;
        this.client = this;
        this.warna = require('../../config/color.json');
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.util = new utilpath
        this.aliases = new Collection();
        this.config = require('../../config/configs.json');
        this.recent = new Set();
        this.db = new Db();
        this.kusonime = new Kusonime(this);
        this.version = "v4.0"
        this.idkernel = "INTI-Hirano-02"
        this.osu = new Osu(this);
        const client = this;
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
    commitshorthash() {
        return new Promise((res, rej) => {
            getLastCommit((err, commit) => {
                if (err) return rej(err);
                return res(commit.shortHash)
            })
        })
    }
    platfrom() {
        let osname = process.platform
        if (osname === "win32") return "Windows"
        if (osname === "darwin") return "MacOS"
        if (osname === "linux") return "GNU/Linux"
        if (osname === "Android" || "android") return "Android"
    }
    commitsubject() {
        return new Promise((res, rej) => {
            getLastCommit((err, commit) => {
                if (err) return rej(err);
                return res(commit.subject)
            })
        })
    }
    reload() {
        fs.readdir("./commands/", (err, categories) => {
            if (err) console.log(err); // it will send you an error, if there was something went wrong.
            console.log(`Found total ${categories.length} categories.`);
            categories.forEach(category => {
                let moduleConf = require(`../../commands/${category}/module.json`);
                moduleConf.path = `./commands/${category}`;
                moduleConf.cmds = [];
                if (!moduleConf) return;
                this.client.helps.set(category, moduleConf);
                fs.readdir(`./commands/${category}`, (err, files) => {
                    console.log(
                        `Found total ${files.length - 1} command(s) from ${category}.`
                    );
                    if (err) console.log(err);

                    files.forEach(file => {
                        if (!file.endsWith(".js")) return;
                        let prop = require(`../../commands/${category}/${file}`);

                        this.client.commands.set(prop.help.name, prop);

                        prop.conf.aliases.forEach(alias => {
                            this.client.aliases.set(alias, prop.help.name);
                        });

                        this.client.helps.get(category).cmds.push(prop.help.name);

                    });
                });

            })
        })
        return this.client.commands
    }

}