/* eslint-disable indent */
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

const path3 = "./database/global.json"
const fs = require("fs")
if (!fs.existsSync(path3)) {
    fs.appendFile('database/global.json', '{ "status": "test", "prefix": "d!", "log": "Change Global Prefix to d!" }', function (err) {
        if (err) throw err;
        console.log('Saved!');
        process.exit()
    });
}

//ex[ress
const express = require('express');
const app = express();
const port = 3000;
const io = require('@pm2/io')
io.init({
    transactions: true,
    http: true
})

app.get('/', (req, res) => res.send('CYBER ON'));

app.listen(port, () =>
    console.log(`app listening at http://localhost:${port}`)
);

const { Intents } = require("discord.js");
const config = require('./config/configs.json');
const token = require('./config/token.json');
const COre = require('./handler/ClientBuilder.js');
const recent = new Set();
const client = new COre({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES"] });


require('./handler/module.js')(client);
require('./handler/Event.js')(client);
require('./handler/cunter.js')(client);
require('./handler/plugin')(client)

client.package = require('./package.json');
client.on('warn', console.warn);
client.on('error', console.error);
client.on("disconnect", () => console.log("Disconnected."));
client.on("reconnecting", () => console.log("Reconnecting."));

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