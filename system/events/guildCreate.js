const { time } = require('@discordjs/builders');
const moment = require("moment")
let jsoning = require("jsoning");
let db = new jsoning("database/global.json");
const date = new Date();
const timeString = time(date);
module.exports = async (client, guild) => {
        console.info("Joined a new guild: " + guild.name);
}