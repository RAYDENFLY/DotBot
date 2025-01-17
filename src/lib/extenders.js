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
        .setURL(options.url)
        .setDescription(string)
        .setColor(options.color)
        .setFooter("DotBot")
    //if options url is set, set the image


    if (options.edit) {
        return this.edit({ embeds: [embed] });
    } else {
        return this.channel.send({ embeds: [embed] });
    }
};
Message.prototype.sendTr = function (key, args, options = {}) {
    let string = this.translate(key, args);
    if (options.prefixEmoji) {
        string = `${this.client.emoji[options.prefixEmoji]} | **${string}**`;
    }

    //if options url is set, set the image


    if (options.edit) {
        return this.edit({ content: string, allowedMentions: { parse: [] } });
    } else {
        return this.channel.send({ content: string, allowedMentions: { parse: [] } });
    }
};
Message.prototype.replyT = function (key, args, options = {}) {
    let string = this.translate(key, args);
    if (options.prefixEmoji) {
        string = `${this.client.emoji[options.prefixEmoji]} | **${string}**`;
    }

    //if options url is set, set the image


    if (options.edit) {
        return this.edit({ content: string });
    } else {
        return this.reply({ content: string, allowedMentions: { parse: [] } });
    }
};