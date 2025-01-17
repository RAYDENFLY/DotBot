'use strict';
var inquirer = require('inquirer');
var fs = require("fs")
const { execSync } = require("child_process");
const defaulttconfig = require("../config/configs.example.json")
var config = {
    bot: {
        owner: []
    },
    lavalink: {},
    util: {},
    mongodb: {},
    spotify: {},
    health: {},
    osu: {},
    config: {},
};
console.log("Running Test for first time pls wait")
execSync("npm test")
console.log("Test success")
console.log("Run setup..")

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
        name: 'lavalinkhost',
        message: "Lavalink host (enter for default)",
        default() {
            return 'localhost';
        },
    },
    {
        type: 'input',
        name: 'lavalinkport',
        message: "Lavalink port (enter for default)",
        default() {
            return 2333;
        },
    },
    {
        type: 'input',
        name: 'lavalinkpass',
        message: "Lavalink Password (enter for default)",
        default() {
            return "dotbotproject";
        },
    },
    {
        type: 'input',
        name: 'hastebin',
        message: "Haste server (enter for default)",
        default() {
            return "https://hastebin.com";
        },
    },
    {
        type: 'input',
        name: 'health',
        message: "Healt protection? (enter for default)",
        default() {
            return true;
        },
    },
    {
        type: 'input',
        name: 'healthram',
        message: "Max Ram Usage in mb? (enter for default)",
        default() {
            return "150";
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
        name: 'spotifyclient',
        message: "Spotify clientid"
    },
    {
        type: 'input',
        name: 'spotifyscret',
        message: "Spotify Screet"
    },
    {
        type: 'input',
        name: 'osuapikey',
        message: "Osu api key?",
        default() {
            return "get at https://osu.ppy.sh/p/api/";
        },
    }
    ,
    {
        type: 'input',
        name: 'sentry',
        message: "sentry api key",
    }
];

inquirer.prompt(questions).then((answers) => {
    config.version = answers.botversion;
    config.bot.name = answers.botname;
    config.bot.owner.push(answers.ownerid)
    config.bot["owner-name"] = answers.ownername;
    config.bot.prefix = answers.prefix;
    config.bot.slash = true
    config.spotify.client_id = answers.spotifyclient;
    config.spotify.secret = answers.spotifyscret;
    config.lavalink.host = answers.lavalinkhost;
    config.lavalink.port = answers.lavalinkport;
    config.lavalink.password = answers.lavalinkpass;
    config.util.hastebin = answers.hastebin;
    config.sentry = answers.sentry;
    config.util["kusonime-api"] = "https://Kusonime-API.demuraaidev.repl.co";
    config.kernel = defaulttconfig.kernel
    config["kernel-version"] = defaulttconfig["kernel-version"];
    config.mongodb.uri = answers.mongourl;
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
            return require("../index");
        } else {
            console.log("Token file not found Loading tokeninit.js ....");
            require("../system/util/tokeninit")
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
                    "Reset both",
                    "Debug Mode",
                    "exit",
                    "exit and start bot"
                ],
            }
        ])
        .then((answers) => {
            if (answers.menu == "Reset config") {
                const questions = [
                    {
                        type: 'confirm',
                        name: 'resetconfig',
                        message: "Reset config?",
                        default: true,
                    }
                ];
                inquirer.prompt(questions).then((answers) => {
                    if (answers.resetconfig) {

                        fs.unlink("./config/configs.json", function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("Config file deleted!");
                            bios();
                        });
                    } else {
                        return bios();
                    }
                })
            } else if (answers.menu == "Reset token") {
                const questions = [
                    {
                        type: 'confirm',
                        name: 'resettoken',
                        message: "Reset token?",
                        default: true,
                    }
                ];
                inquirer.prompt(questions).then((answers) => {
                    if (answers.resettoken) {
                        fs.unlink("./config/token.json", function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("Token file deleted!");
                            bios();
                        });
                    } else {
                        return bios();
                    }
                })
            } else if (answers.menu == "Debug Mode") {
                const questions = [
                    {
                        type: 'confirm',
                        name: 'debug',
                        message: "Debug Mode?",
                        default: true,
                    }
                ];

                inquirer.prompt(questions).then((answers) => {
                    //if debug mode is true
                    if (answers.debug) {
                        const debug = {}
                        debug.debug = true;
                        var json = JSON.stringify(debug);
                        fs.writeFile("./config/debug.json", json, 'utf8', function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        })
                        console.log("Debug Mode enabled");
                        bios();
                    } else {
                        const debug = {}
                        debug.debug = false;
                        var json = JSON.stringify(debug);
                        fs.writeFile("./config/debug.json", json, 'utf8', function (err) {
                            if (err) {
                                return console.log(err);
                            }
                        })
                        console.log("Debug Mode Disabled");
                        bios();
                    }
                });


            } else if (answers.menu == "exit") {
                return process.exit(0);
            } else if (answers.menu == "exit and start bot") {
                return require("../index");
            } else if (answers.menu == "Reset both") {
                const questions = [
                    {
                        type: 'confirm',
                        name: 'resetboth',
                        message: "Reset token and config?",
                        default: true,
                    }
                ];
                inquirer.prompt(questions).then((answers) => {
                    if (answers.resetboth) {
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
                    } else {
                        return bios();
                    }
                })

            }
        });
}
