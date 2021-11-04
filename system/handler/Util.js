const snek = require("node-superfetch");
const request = require("node-superfetch"), { post } = require("node-superfetch");
const discord = require('discord.js')
const hastebinurl = require("../../config/configs.json").util.hastebin

class Util {
    constructor() {
        this.parseDur = function parseDur(ms) {
            let seconds = ms / 1000;
            let days = parseInt(seconds / 86400);
            seconds = seconds % 86400;
            let hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            let minutes = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);

            if (days) {
                return `${days} day, ${hours} hours, ${minutes} minutes`;
            } else if (hours) {
                return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
            } else if (minutes) {
                return `${minutes} minutes, ${seconds} seconds`;
            }
            return `${seconds} seconds`;
        };
        this.chunk = function chunk(array, chunkSize) {
            let temp = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                temp.push(array.slice(i, i + chunkSize));
            }
            return temp;
        };
        this.hastebin = async function hastebin(code) {
            const { body } = await post(hastebinurl + "/documents").send(code);
            return hastebinurl + `/${body.key}.js`;
        }
    }
}

module.exports = Util