const Discord = require("discord.js"),
    fs = require("fs");
module.exports = client => {
    client.bios = new Discord.Collection();
    fs.readdir("./src/bios/", (err, files) => {
        files.forEach(file => {
            console.info("load bios " + file)
            let prop = require(`../../src/bios/${file}`);
            if (!file.endsWith(".js")) return;

            client.bios.set(file, prop);
        })
    })

}