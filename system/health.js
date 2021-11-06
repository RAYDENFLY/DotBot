const fs = require("fs");
var config = require('../config/configs.json')
const { execSync } = require("child_process");
//check config version
if (config.config.version < 2) {
    console.warn("Config version outdate")
    process.exit(1)
} else {
    console.info("Config version up to date")
}

const isReplit = (
    process.env.REPLIT_DB_URL !== undefined &&
    process.env.REPL_ID !== undefined &&
    process.env.REPL_IMAGE !== undefined &&
    process.env.REPL_LANGUAGE !== undefined &&
    process.env.REPL_OWNER !== undefined &&
    process.env.REPL_PUBKEYS !== undefined &&
    process.env.REPL_SLUG !== undefined)
if (isReplit && (Number(process.versions.node.split(".")[0]) < 16)) {
    console.info("This doesn't use Node.js v16 or newer, trying to install Node.js v16...");
    execSync(`npm i --save-dev node@16.6.1 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH`);
    console.info("Node.js v16 has installed, please re-run the bot.");
    process.exit(0);
}

try {
    require("discord.js")
} catch (error) {
    console.error("dependency not found")
    console.error("Calling npm to install")
    execSync("npm install")
    console.info("npm installed")
    console.info("restarting..")

    process.exit(1)
}

//if health enabled
if (config.health.enabled) {
    console.info("Health enabled")
    console.info("Checking health every " + msToSec(config.health.interval) + " seconds")
    console.info("running Health service...")
} else {
    return console.warn("Health protection is disabled")
}
if (config.bot.slash) {
    console.info("Slash command enabled")
} else {
    console.warn("Slash command disabled")
}

//memory usage overload protection
var interval = setInterval(function () {
    const used = convert(process.memoryUsage().heapUsed)
    if (used > config.health.ram) {
        console.warn("Memory usage overload")
        process.exit(1)
    }
}, 2000);


//memory usage to megabyte
function convert(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
//ms to seconds
function msToSec(ms) {
    return ms / 1000
}

//TODO: Add cpu protection overload


//Core protection
var interval = setInterval(function () {
    fs.access("./system/kernel/ClientBuilder.js", function (error) {
        if (error) {
            console.error("[CP] WARNING CORE FILE MISSING!!")
        }
    })
}, config.health.interval);

