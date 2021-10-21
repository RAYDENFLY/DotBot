let jsoning = require("jsoning");
let db = new jsoning("database/guild.json");
const { time } = require('@discordjs/builders');
const moment = require("moment")

const date = new Date();
const timeString = time(date);
module.exports = async(client, guild) => {
        console.log("Joined a new guild: " + guild.name);
        db.set(guild.id, moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
}