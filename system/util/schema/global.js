const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    config = require("../../../config/configs.json")

module.exports = mongoose.model("globall", new Schema({
    name: { "type": String, "default": config.bot.name },
    /* REQUIRED */
    guildcount: { type: Number, default: 0 }, // Discord ID of the guild
    /* CONFIGURATION */
    usercount: { type: Number, default: 0 }, // Time of creation
}));