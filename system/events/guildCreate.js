let jsoning = require("jsoning");
const { time } = require('@discordjs/builders');
const moment = require("moment")

const date = new Date();
const timeString = time(date);
module.exports = async (client, guild) => {
        var insert = { "guildid": guild.id, "date": moment().format("dddd, MMMM Do YYYY, h:mm:ss a") };
        console.info("Joined a new guild: " + guild.name);
        client.db.collection.collection("guild").insertOne(insert, function (err, res) {
                if (err) throw err;
                console.info("1 guild ad to database");
                client.db.client.close();
        });
}