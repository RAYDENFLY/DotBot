const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../../config/configs.json"),
    languages = require("../../../src/lang/language-meta.json");

module.exports = mongoose.model("guilds", new Schema({

    /* REQUIRED */
    guildid: { type: String }, // Discord ID of the guild

    /* CONFIGURATION */
    time: { type: String, default: Date.now() }, // Time of creation
    lang: { type: String, default: languages.find((l) => l.default).name }, // Language of the guild
    prefix: { type: String, default: config.bot.prefix }, // Default or custom prefix of the guild
}));