require('console-warn');
require('console-info');
require('console-error');

//express for uptime
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('CYBER ON'));

app.listen(port, () =>
    console.log(`http listening at http://localhost:${port}`)
);



//Welcome to code
const fs = require("fs")
//ASCII
try {
    var data = fs.readFileSync('doh.txt', 'utf8');
    console.log(data.toString());
} catch (e) {
    console.error('Error:', e.stack);
}

//Creating database for first time
require("./install")

//config
const token = require('./config/token.json'); //token bot
const COre = require('./system/handler/ClientBuilder.js');
const client = new COre({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"] }); //intents

//start bot
require('./system/handler/bios.js')(client); //load bios
require('./system/handler/module.js')(client); //load commands and plugin
require('./system/handler/Event.js')(client); //load event
require('./system/handler/cunter.js')(client); //Database
require('./system/handler/plugin')(client) //start plugin
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
