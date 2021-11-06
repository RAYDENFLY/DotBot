require("./src/lib/console.warn");
require('./src/lib/console.info');
require('./src/lib/console.error');

const fs = require("fs")
if (fs.existsSync("./config/configs.json")) {
    //if token exists
    if (fs.existsSync("./config/token.json")) {
        console.info("Config file found, skipping setup");
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

                });
            });
    }
} else {
    return require("./install")
}

//express for uptime
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('CYBER ON'));

app.listen(port, () =>
    console.log(`http listening at http://localhost:${port}`)
);



//Welcome to code
//ASCII
try {
    var data = fs.readFileSync("./src/assets/doh.txt", 'utf8');
    console.log(data.toString());
} catch (e) {
    console.error('Error:', e.stack);
}

//health startup
require("./system/health")

//Creating database for first time
require("./system/util/dbinit")

//config
const token = require('./config/token.json'); //token bot
const COre = require('./system/kernel/ClientBuilder.js');
const client = new COre({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS", "GUILD_VOICE_STATES"] }); //intents

//start bot
require('./system/kernel/bios')(client); //load bios
require('./system/kernel/module')(client); //load commands and plugin
require('./system/kernel/Event')(client); //load event
require('./system/kernel/plugin')(client) //start plugin
require('./system/util/readline')(client) //start plugin

client.package = require('./package.json');
client.on('warn', console.warn);
client.on('error', console.error);
client.on("raw", (d) => client.manager.updateVoiceState(d));
var lisen = fs.readFileSync('LICENSE', 'utf8');
client.license = lisen.toString()
const languages = require("./system/util/languages");
//client.translations = await languages();


//error handler
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", reason.stack || reason);
    console.error(reason);
});

process.on("uncaughtException", err => {
    console.error(new Date());
    console.error(`Caught exception: ${err}`);
    console.error(err);
    if (err.code == "PROTOCOL_ENQUEUE_AFTER_FATAL_ERROR") {
        console.error("true");
    }
});


//login
client.login(token.token).catch(console.error);
