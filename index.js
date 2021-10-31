var blessed = require('blessed');
var screen = blessed.screen({
    smartCSR: true
});
screen.title = 'DotBot';
require('console-warn');
require('console-info');
require('console-error');

const fs = require("fs")
//ASCII
try {
    var data = fs.readFileSync('doh.txt', 'utf8');
    console.log(data.toString());
} catch (e) {
    console.log('Error:', e.stack);
}
//Creating database for first time
require("./install")

//express for uptime
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('CYBER ON'));

app.listen(port, () =>
    console.log(`http listening at http://localhost:${port}`)
);
//Welcome to code

const token = require('./config/token.json');
const COre = require('./system/handler/ClientBuilder.js');
const client = new COre({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"] });

require('./system/handler/bios.js')(client); //load bios
require('./system/handler/module.js')(client); //load commands and plugin
require('./system/handler/Event.js')(client); //load event
require('./system/handler/cunter.js')(client); //Database
require('./system/handler/plugin')(client) //start plugin

client.package = require('./package.json');
client.on('warn', console.warn);
client.on('error', console.error);
client.on("raw", (d) => client.manager.updateVoiceState(d));

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


client.login(token.token).catch(console.error);