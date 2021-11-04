const Discord = require("discord.js"),
    fs = require("fs");
module.exports = async client => {

    client.plugin = new Discord.Collection();
    client.pluginmanager = new Discord.Collection();

    fs.readdir("./src/plugin/", (err, categories) => {
        if (err) console.log(err); // it will send you an error, if there was something went wrong.
        console.info(`Found total ${categories.length} plugin categories.`);

        categories.forEach(category => {
            let moduleConf = require(`../../src/plugin/${category}/plugin.json`);
            moduleConf.path = `./src/plugin/${category}`;
            moduleConf.cmds = [];
            if (!moduleConf) return;
            client.pluginmanager.set(category, moduleConf);


            fs.readdir(`./src/plugin/${category}`, (err, files) => {
                console.info(
                    `Found total ${files.length - 1} files(s) from plugin ${category}.`
                );
                if (err) console.log(err);



                files.forEach(file => {
                    let prop = require(`../../src/plugin/${category}/`);

                    if (!file.endsWith("index.js")) return;


                    client.plugin.set(prop.plugin.name, prop);

                    client.pluginmanager.get(category).cmds.push(prop.plugin.name);

                });
            });
        });
    });
}