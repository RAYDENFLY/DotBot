require("../src/lib/console.warn");
require('../src/lib/console.info');
require('../src/lib/console.error');
require(`../src/lib/console.tips`)
require(`../src/lib/console.debug`)
require("../src/lib/extenders")
//ping if 12ms run 
const exec = require('child_process').exec;
const ping = async () => {
    try {
        const start = Date.now();
        const { stdout, stderr } = await exec('ping -c 1 -W 1 google.com')
        const end = Date.now();
        const time = end - start;
        if (time > 1000) {
            console.warn(`Warning high ping :${time}ms ping`);
        } else {
            console.info(`${time}ms ping`);
        }
    } catch (error) {
        console.error(error);
    }
}



const config = require("../config/configs.json")
const Sentry = require("@sentry/node")
if (config.sentry) {
    try {
        Sentry.init({
            dsn: config.sentry
        });
    } catch (e) {
        console.error(e);
        console.tips("Looks like your Sentry DSN key is invalid. If you do not intend to use Sentry, please remove the key from the configuration file.");
    }
}

const fs = require("fs")
const { execSync } = require("child_process");
const isReplit = (
    process.env.REPLIT_DB_URL !== undefined &&
    process.env.REPL_ID !== undefined &&
    process.env.REPL_IMAGE !== undefined &&
    process.env.REPL_LANGUAGE !== undefined &&
    process.env.REPL_OWNER !== undefined &&
    process.env.REPL_PUBKEYS !== undefined &&
    process.env.REPL_SLUG !== undefined)
if (isReplit) {
    console.warn("Replit is not fully supported");
}
if (isReplit && (Number(process.versions.node.split(".")[0]) < 16)) {
    console.info("This doesn't use Node.js v16 or newer, trying to install Node.js v16...");
    execSync(`npm i --save-dev node@16.6.1 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH`);
    console.info("Node.js v16 has installed, please re-run the bot.");
    process.exit(0);
}

//express for uptime
const express = require('express');
const app = express();
const port = 3000;


app.get('/', (req, res) => res.send('CYBER ON'));
//express if port has been used, use another port
const portfinder = require('portfinder');
portfinder.getPort((err, port) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    app.listen(port, () => {
        console.info(`Listening on port ${port}`);
    });
});

//Welcome to code
//ASCII
try {
    var data = fs.readFileSync("./src/assets/doh.txt", 'utf8');
    console.log(data.toString());
    console.log("|  Version          : " + config.version);
    console.log("|  Kernel id        : " + config.kernel);
    console.log("|  Kernel version   : " + config["kernel-version"]);
    console.log("|  Prototype name   : " + config.bot.name);
    console.log("|  Owner ID         : " + config.bot.owner);
    console.log("---------------------\n");
} catch (e) {
    console.error('Error:', e.stack);
}

//health startup
require("./health")

//Creating database for first time
require("./util/dbinit")

//config
const token = require('../config/token.json'); //token bot
const COre = require('./kernel/ClientBuilder.js'),
    mongoose = require("mongoose")
const client = new COre(); //intents

//start bot
require('./kernel/module')(client); //load commands and plugin
require('./kernel/Event')(client); //load event
require('./kernel/plugin')(client) //start plugin
require('./util/readline')(client) //start plugin

client.package = require('../package.json');
client.on('warn', console.warn);
client.on('error', console.error);
//if file exist load it
if (fs.existsSync("./config/debug.json")) {
    const debug = require("../config/debug.json");
    if (debug.debug) {
        console.info("Debug mode enbled");
        client.on('debug', (message) => {
            console.debug(message);
        });
    }
}
client.on("raw", (d) => client.music.manager.updateVoiceState(d));
var lisen = fs.readFileSync('LICENSE', 'utf8');
client.license = lisen.toString()

const init = async () => {
    const languages = require("./util/languages");
    client.translations = await languages();

    // connect to mongoose database
    mongoose.connect(config.mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.info("Connected to the Mongodb database.");
    }).catch((err) => {
        console.error("Unable to connect to the Mongodb database. Error:" + err);
    });
    setTimeout(() => {
        console.tips("if you like this project give star to my github");
    }, 1000);
    ping();
}

init()

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
process.on("warning", (warning) => {
    console.warn(warning.stack);
});

//login
client.login(token.token).catch(console.error);
