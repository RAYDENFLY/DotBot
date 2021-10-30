var blessed = require('blessed');
var screen = blessed.screen({
    smartCSR: true
});
screen.title = 'DotBot';

//Global json 
const path3 = "./database/global.json"
const fs = require("fs")
if (!fs.existsSync(path3)) {
    fs.appendFile('database/global.json', '{ "status": "test", "prefix": "d!", "log": "Change Global Prefix to d!" }', function (err) {
        if (err) throw err;
        console.log('Saved!');
        process.exit()
    });
}
//ASCII
try {
    var data = fs.readFileSync('doh.txt', 'utf8');
    console.log(data.toString());
} catch (e) {
    console.log('Error:', e.stack);
}



//express for uptime
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('CYBER ON'));

app.listen(port, () =>
    console.log(`app listening at http://localhost:${port}`)
);

const token = require('./config/token.json');
const COre = require('./handler/ClientBuilder.js');
const client = new COre({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES", "GUILD_MEMBERS"] });

require('./handler/bios.js')(client); //load bios
require('./handler/module.js')(client); //load commands and plugin
require('./handler/Event.js')(client); //load event
require('./handler/cunter.js')(client); //Database
require('./handler/plugin')(client) //start plugin

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