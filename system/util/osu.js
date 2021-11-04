const Discord = require('discord.js');
const token = require("../../config/configs.json").osu.apikey
const config = require("../../config/configs.json")
const ossu = require('node-osu');
const osuApi = new ossu.Api(token, {

    notFoundAsError: true,
    completeScores: false,
    parseNumeric: false
});

class osu {
    constructor(client) {
        this.client = client;
    }
    getUser(query) {
        osuApi.apiCall('/get_user', { u: query }).then(user => {
            return user[0];
        })
    }
    getBeatmap(query) {
        osuApi.getBeatmaps({ b: query }).then(beatmaps => {
            return beatmaps[0].title;

        });
    }

}


module.exports = osu;