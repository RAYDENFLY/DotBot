const path3 = "./database/global.json"
const path2 = "./database/blacklist.json"
const lavalink = "./lavalink.jar"
const fs = require("fs")
if (!fs.existsSync(path3)) {
    fs.appendFile('database/global.json', '{ "status": "test", "prefix": "d!", "log": "Change Global Prefix to d!" }', function (err) {
        if (err) throw err;
        console.log('Database create 1/3');
    });
}
if (!fs.existsSync(path2)) {
    fs.appendFile('database/blacklist.json', '{"blacklist": []}', function (err) {
        if (err) throw err;
        console.log('Database create 3/3');
        process.exit()
    });
}