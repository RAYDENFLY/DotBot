require('../src/lib/console.info');
require("../src/lib/console.warn");
require('../src/lib/console.error');
const { readdirSync } = require("fs");
const { ShardingManager } = require('discord.js');
const token = require('../config/token.json'); //token bot
const manager = new ShardingManager('./system/bot.js', {
    token: token.token,
    totalShards: "auto",
});
console.log('Starting shard')
console.log('--------------')
manager.on('shardCreate', shard => {
    console.info(`Launched shard ${shard.id}`)
    shard.on('death', (process) => {
        if (process.exitCode === null) {
            console.warn(`Shard ${shard.id} died with code null / restart`);
            return console.warn(`Restarting all shard`);
        }
        if (process.exitCode > 0) {
            console.error(`Shard ${shard.id} died with code ${process.exitCode}`)
            return console.error(`Restarting bot Shard ${shard.id}`)
        } else {
            console.error(`Shard ${shard.id} exit with code ${process.exitCode}`)
            return stop()

        }

    })
    const events = readdirSync("./system/events/shard/");
    for (let event of events) {
        let file = require(`./events/shard/${event}`);
        shard.on(event.split(".")[0], (...args) => file(shard, ...args));
    }

});
manager.spawn(manager.totalShards, 100)
function stop() {
    console.info('Stopping shard')
    manager.broadcastEval('process.exit(0)')
    process.exit(0)
}