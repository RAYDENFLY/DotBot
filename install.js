'use strict';
var inquirer = require('inquirer');
var fs = require("fs")
let botname;
let botversion = "1.0";
let ownerid;
let ownername = "DemuraAI";
var config = {
    bot: {
        owner: []
    },
    lavalink: {},
    util: {},
    health: {},
    osu: {},
    config: {},
};


const questions = [
    {
        type: 'input',
        name: 'botname',
        message: "Bot Name",
    },
    {
        type: 'input',
        name: 'botversion',
        message: "Bot Version",
        default() {
            return '1.0';
        },
    },
    {
        type: 'input',
        name: 'ownerid',
        message: "Owner Id"
    },
    {
        type: 'input',
        name: 'ownername',
        message: "What's your name?"
    },
    {
        type: 'input',
        name: 'prefix',
        message: "What's bot prefix?"
    },
    {
        type: 'input',
        name: 'ownername',
        message: "What's your name?"
    },
    {
        type: 'input',
        name: 'lavalinkhost',
        message: "Lavalin host",
        default() {
            return 'localhost';
        },
    },
    {
        type: 'input',
        name: 'lavalinkport',
        message: "Lavalink port",
        default() {
            return 2333;
        },
    },
    {
        type: 'input',
        name: 'lavalinkpass',
        message: "Lavalink Password",
        default() {
            return "dotbotproject";
        },
    },
    {
        type: 'input',
        name: 'lavalinkport',
        message: "Lavalink port",
        default() {
            return 2333;
        },
    },
    {
        type: 'input',
        name: 'hastebin',
        message: "Haste server",
        default() {
            return "https://hastebin.com";
        },
    },
    {
        type: 'input',
        name: 'health',
        message: "Healt protection?",
        default() {
            return true;
        },
    },
    {
        type: 'input',
        name: 'healthram',
        message: "Max Ram Usage?",
        default() {
            return "8.00";
        },
    },
    {
        type: 'input',
        name: 'osuapikey',
        message: "Osu api key?",
        default() {
            return "get at https://osu.ppy.sh/p/api/";
        },
    }
];

inquirer.prompt(questions).then((answers) => {
    config.version = answers.botversion;
    config.bot.name = answers.botname;
    config.bot.owner.push(answers.ownerid)
    config.bot["owner-name"] = answers.ownername;
    config.bot.prefix = answers.prefix;
    config.lavalink.host = answers.lavalinkhost;
    config.lavalink.port = answers.lavalinkport;
    config.lavalink.password = answers.lavalinkpass;
    config.util.hastebin = answers.hastebin;
    config.util["kusonime-api"] = "https://Kusonime-API.demuraaidev.repl.co"
    config.kernel = "INTI-Hirano-02";
    config["kernel-version"] = "v3.0";
    config.health.enabled = answers.health;
    config.health.ram = answers.healthram;
    config.osu.apikey = answers.osuapikey;
    config.config.version = "2";
    var json = JSON.stringify(config);
    fs.writeFile("./config/config.json", json, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
    console.log("Config file created!");
});
