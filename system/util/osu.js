const Discord = require('discord.js');
const token = require("../../config/configs.json").osu.apikey
const config = require("../../config/configs.json")
const ossu = require('node-osu');
const osuApi = new ossu.Api(token, {
    // baseUrl: sets the base api url (default: https://osu.ppy.sh/api)
    notFoundAsError: true, // Throw an error on not found instead of returning nothing. (default: true)
    completeScores: false, // When fetching scores also fetch the beatmap they are for (Allows getting accuracy) (default: false)
    parseNumeric: false // Parse numeric values into numbers/floats, excluding ids
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

};


module.exports = osu;