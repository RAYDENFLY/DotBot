const fs = require("fs");
var config = require('../config/configs.json')

//check config version
if (config.config.version < 2) {
    console.warn("Config version outdate")
    process.exit(1)
} else {
    console.info("Config version up to date")
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
    const used = process.memoryUsage().heapUsed
    if (used > MbToBytes(config.health.ram)) {
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
function MbToBytes(mb) {
    return mb * 1024 * 1024;
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

