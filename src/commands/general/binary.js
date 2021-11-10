const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let choice = ["decode", "encode"];
    if (!choice.includes(args[0].toLowerCase())) return message.error("binary:UNKNOW")

    let text = args.slice(1).join(" ");

    if (!text) return message.error("binary:NEEDARG")

    if (text.length > 1024) return message.error("binary:MUCH")

    function encode(char) {
        return char.split("").map(str => {
            const converted = str.charCodeAt(0).toString(2);
            return converted.padStart(8, "0");
        }).join(" ")
    };

    function decode(char) {
        return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join(" ");
    };

    if (args[0].toLowerCase() === "encode") {
        return message.channel.send(encode(text));
    } else if (args[0].toLowerCase() === "decode") {
        return message.channel.send(decode(text));
    }
};

exports.slash = false

exports.help = {
    name: "binary",
    description: "binary:DESCRIPTION",
    usage: "binary <encode | decode> <text>",
    example: "binary encode hello"
}

exports.conf = {
    aliases: [],
    cooldown: 5,
    permissions: [""],
    needperms: [""],
}