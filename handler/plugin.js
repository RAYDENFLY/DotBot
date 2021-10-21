const Discord = require("discord.js"),
    fs = require("fs");

    let jsoning = require("jsoning");
    let db = new jsoning("plugin-package.json");

const path = require('../plugin-package.json'); 
module.exports = async client => {
    let has2 = await db.has("installed")
    let create = await db.set("installed", { base: "index.js" })
    client.plugin = new Discord.Collection();
    client.pluginmanager = new Discord.Collection();

    fs.readdir("./plugin/", (err, categories) => {
        if (err) console.log(err); // it will send you an error, if there was something went wrong.
        console.log(`Found total ${categories.length} plugin categories.`);

        categories.forEach(category => {
            let moduleConf = require(`../plugin/${category}/plugin.json`);
            moduleConf.path = `./plugin/${category}`;
            moduleConf.cmds = [];
            if (!moduleConf) return;
            client.pluginmanager.set(category, moduleConf);
            

            fs.readdir(`./plugin/${category}`, (err, files) => {
                console.log(
                    `Found total ${files.length - 1} files(s) plugin from ${category}.`
                );
                if (err) console.log(err);

                

                files.forEach(file => {
                    let prop = require(`../plugin/${category}/`);
                    if(has2) {
                        create
                    }

                    if (!file.endsWith("index.js")) return;

                    let cmdName = file.split(".")[0];

                    client.plugin.set(prop.plugin.name, prop);

                    client.pluginmanager.get(category).cmds.push(prop.plugin.name);

                });
            });
        });
    });
}