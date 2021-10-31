const path3 = "./database/global.json"
const path = "./database/msend.json"
const path2 = "./database/blacklist.json"
const fs = require("fs")
if (!fs.existsSync(path3)) {
    fs.appendFile('database/global.json', '{ "status": "test", "prefix": "d!", "log": "Change Global Prefix to d!" }', function (err) {
        if (err) throw err;
        console.log('Saved!');
        process.exit()
    });
}
if (!fs.existsSync(path)) {
    fs.appendFile('database/msend.json', '{}', function (err) {
        if (err) throw err;
        console.log('Saved!');
        process.exit()
    });
}
if (!fs.existsSync(path2)) {
    fs.appendFile('database/blacklist.json', '{"blacklist": []}', function (err) {
        if (err) throw err;
        console.log('Saved!');
        process.exit()
    });
}