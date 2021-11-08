const { Collection, Client } = require("discord.js"),
    Discord = require("discord.js"),
    fs = require("fs");
const Kusonime = require('../util/kusonime');
const Osu = require('../util/osu');
const { getLastCommit } = require('git-last-commit');
const config = require("../../config/configs.json")
const drmpath = require('../util/drnmusic');
const Neural = require('../util/neural');
const utilpath = require("./Util")
module.exports = class system extends Client {
    constructor(options) {
        super(options)
        this.connections = new Map();
        this.client = this;
        this.warna = require('../../config/color.json');
        this.commands = new Collection();
        this.cooldowns = new Collection();
        this.languages = require("../../src/lang/language-meta.json");
        this.util = new utilpath
        this.aliases = new Collection();
        this.config = require('../../config/configs.json');
        this.emoji = require('../../config/emoji.json');
        this.db = {}
        this.db.guild = require("../util/schema/guild")
        this.kusonime = new Kusonime(this);
        this.version = "v5.0"
        this.idkernel = "INTI-Hirano-02"
        this.osu = new Osu(this);
        this.dbcache = {}
        this.neural = new Neural(this);
        this.dbcache.guilds = new Collection();
        this.dbcache.afk = new Collection();
        const client = this;
        this.music = new drmpath(this);
    }
    commitshorthash() {
        return new Promise((res, rej) => {
            getLastCommit((err, commit) => {
                if (err) return rej(err);
                return res(commit.shortHash)
            })
        })
    }
    async findOrCreateGuild({ id: guildID }, isLean) {
        if (this.dbcache.guilds.get(guildID)) {
            return isLean ? this.dbcache.guilds.get(guildID).toJSON() : this.dbcache.guilds.get(guildID);
        } else {
            let guildData = (isLean ? await this.db.guild.findOne({ guildid: guildID }).lean() : await this.db.guild.findOne({ guildid: guildID }));
            if (guildData) {
                if (!isLean) this.dbcache.guilds.set(guildID, guildData);
                return guildData;
            } else {
                guildData = new this.db.guild({ guildid: guildID });
                await guildData.save();
                this.dbcache.guilds.set(guildID, guildData);
                return isLean ? guildData.toJSON() : guildData;
            }
        }
    }
    get defaultLanguage() {
        return this.languages.find((language) => language.default).name;
    }

    translate(key, args, locale) {
        if (!locale) locale = this.defaultLanguage;
        const language = this.translations.get(locale);
        if (!language) throw "Invalid language set in data.";
        return language(key, args);
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
    sendTime(Channel, Error) {
        let embed = new Discord.MessageEmbed().setColor("RANDOM").setDescription(Error);

        Channel.send({ embeds: [embed] });
    }

}