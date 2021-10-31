const Discord = require("discord.js"),
    fs = require("fs");
module.exports = client => {
    client.bios = new Discord.Collection();
    fs.readdir("./bios/", (err, files) => {
        files.forEach(file => {
            console.log("load bios " + file)
            let prop = require(`../../bios/${file}`);
            if (!file.endsWith(".js")) return;

            client.bios.set(file, prop);
        })
    })

}