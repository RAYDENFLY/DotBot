const fs = require("fs");
var config = require('../config/configs.json');

//check config version
if (config.config.version < 2) {
    console.warn("Config version outdate")
    process.exit(1)
} else {
    console.info("Config version up to date")
}
//Memory usage protection
if (config.health.enabled === true) {
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    var interval = setInterval(function () {
        if (`${Math.round(used * 100) / 100}` > config.health.ram) {
            console.warn("Memory usage overload")
            process.exit(1)
        }
    }, 2000);
}
//TODO: Add cpu protection overload

//Core protection
var interval = setInterval(function () {
    fs.access("./system/handler/ClientBuilder.js", function (error) {
        if (error) {
            console.warn("[CP] WARNING CORE FILE MISSING!!")
        }
    })
}, 2000);
