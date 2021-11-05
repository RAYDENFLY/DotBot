const Discord = require("discord.js"),
    fs = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const token = require('../../config/token.json');
const rest = new REST({ version: '9' }).setToken(token.token);

module.exports = client => {
    client.commands = new Discord.Collection();
    client.aliases = new Discord.Collection();
    client.helps = new Discord.Collection();
    client.slash = new Discord.Collection()
    client.dataAttachment = new Discord.Collection()
    const commandss = [];

    fs.readdir("./src/commands/", (err, categories) => {
        if (err) console.log(err); // it will send you an error, if there was something went wrong.
        console.info(`Found total ${categories.length} categories.`);

        categories.forEach(category => {
            let moduleConf = require(`../../src/commands/${category}/module.json`);
            moduleConf.path = `./src/commands/${category}`;
            moduleConf.cmds = [];
            if (!moduleConf) return;
            client.helps.set(category, moduleConf);

            fs.readdir(`./src/commands/${category}`, (err, files) => {
                console.info(
                    `Found total ${files.length - 1} command(s) from ${category}.`
                );
                if (err) console.log(err);
                let commands = new Array();

                files.forEach(file => {
                    let prop = require(`../../src/commands/${category}/${file}`);

                    if (!file.endsWith(".js")) return;

                    let cmdName = file.split(".")[0];

                    client.commands.set(prop.help.name, prop);
                    client.slash.set(prop.help.name, prop)

                    prop.conf.aliases.forEach(alias => {
                        client.aliases.set(alias, prop.help.name);
                    });


                    client.helps.get(category).cmds.push(prop.help.name);

                    if (prop.slash === false) return;
                    client.slash.set(prop.help.name, prop)
                    commandss.push(prop.slash.data.toJSON());
                    (async () => {
                        try {
                            console.warn(`Started refreshing slash : ${prop.help.name}`);
                            await rest.put(
                                Routes.applicationGuildCommands("898186273355874324", "897850095335268412"), { body: commandss },
                            );
                            console.info(`Successfully reloaded slash : ${prop.help.name}`);
                        } catch (error) {
                            console.error(error);
                        }
                    })();

                });
            });
        });
    });

};