const { Guild, Message, MessageEmbed } = require("discord.js");


Guild.prototype.translate = function (key, args) {
    const language = this.client.translations.get(this.data.language);
    if (!language) throw "Message: Invalid language set in data.";
    return language(key, args);
};

Message.prototype.translate = function (key, args) {
    const language = this.client.translations.get(
        this.guild ? this.guild.data.lang : "en-US"
    );
    if (!language) throw "Message: Invalid language set in data.";
    return language(key, args);
};