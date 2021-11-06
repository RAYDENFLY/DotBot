'use strict';
var inquirer = require('inquirer');
var fs = require("fs")
const { execSync } = require("child_process");
const COre = require('./system/kernel/ClientBuilder.js');
const client = new COre({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"] });
var config = {
    bot: {
        owner: []
    },
    lavalink: {},
    util: {},
    mongodb: {},
    health: {},
    osu: {},
    config: {},
};

if (fs.existsSync("./config/configs.json")) {
    //if token exists
    if (fs.existsSync("./config/token.json")) {
        console.log("Config file found, skipping setup");
        console.log("entering BIOS mode")
        return bios();
    } else {
        //if config exists but token doesn't
        console.log("Config file found!");
        console.log("Please enter your token");
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'token',
                    message: 'Please enter your token',
                }
            ])
            .then((answers) => {
                fs.writeFile("./config/token.json", JSON.stringify(answers.token), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Token file created!");
                    process.exit();
                });
            });
    }
}


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
        name: 'mongourl',
        message: "Mongodb Url (required)?"
    },
    {
        type: 'input',
        name: 'mongodb',
        message: "Mongodb db name (required)?"
    },
    {
        type: 'input',
        name: 'lavalinkhost',
        message: "Lavalink host",
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
            return "36 MB";
        },
    },
    {
        type: 'input',
        name: 'healthinterval',
        message: "Check RAM intervl in ms?",
        default() {
            return "2000";
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
    config.bot.slash = true
    config.lavalink.host = answers.lavalinkhost;
    config.lavalink.port = answers.lavalinkport;
    config.lavalink.password = answers.lavalinkpass;
    config.util.hastebin = answers.hastebin;
    config.util["kusonime-api"] = "https://Kusonime-API.demuraaidev.repl.co";
    config.kernel = client.idkernel;
    config["kernel-version"] = client.version;
    config.mongodb.uri = answers.mongourl;
    config.mongodb.db = answers.mongodb;
    config.health.enabled = answers.health;
    config.health.ram = answers.healthram;
    config.health.interval = answers.healthinterval;
    config.osu.apikey = answers.osuapikey;
    config.config.version = "2";
    var json = JSON.stringify(config);
    fs.writeFile("./config/configs.json", json, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
    console.log("Config file created!");

    //check if config file exist
    fs.exists("./config/token.json", function (exists) {
        if (exists) {
            console.log("Token file found");
        } else {
            console.log("Token file not found Loading tokeninit.js ....");
            require("./system/util/tokeninit")
        }
    });


});

function bios() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'menu',
                message: 'BIOS MENU',
                choices: [
                    'Reset config',
                    'Reset token',
                    "Reset both"
                ],
            }
        ])
        .then((answers) => {
            if (answers.menu == "Reset config") {
                fs.unlink("./config/configs.json", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Config file deleted!");
                    bios();
                });
            } else if (answers.menu == "Reset token") {
                fs.unlink("./config/token.json", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Token file deleted!");
                    bios();
                });
            } else if (answers.menu == "Reset both") {
                fs.unlink("./config/configs.json", function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Config file deleted!");
                    fs.unlink("./config/token.json", function (err) {
                        if (err) {
                            return console.log(err);
                        }
                        console.log("Token file deleted!");
                        bios();
                    });
                });
            }
        });
}
