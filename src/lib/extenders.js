const { Guild, Message, MessageEmbed } = require("discord.js");
const Discord = require("discord.js")

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
// Wrapper for sendT with error emoji
Message.prototype.error = function (key, args, options = {}) {
    options.prefixEmoji = "error";
    options.color = "RED"
    return this.sendT(key, args, options);
};

// Wrapper for sendT with success emoji
Message.prototype.success = function (key, args, options = {}) {
    options.prefixEmoji = "success";
    options.color = "GREEN"
    return this.sendT(key, args, options);
};

// Translate and send the message
Message.prototype.sendT = function (key, args, options = {}) {
    let string = this.translate(key, args);
    if (options.prefixEmoji) {
        string = `${this.client.emoji[options.prefixEmoji]} | **${string}**`;
    }
    const embed = new Discord.MessageEmbed()
        .setColor(options.color)
        .setDescription(string)
        .setFooter("DotBot")

    if (options.edit) {
        return this.edit({ embeds: [embed] });
    } else {
        return this.channel.send({ embeds: [embed] });
    }
};