const { MessageActionRow, MessageButton } = require('discord.js'), { post } = require("node-superfetch");
const Discord = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders');

let typeofs;

exports.run = async (client, message, args, runs, plugin, data) => {
    const embed = new Discord.MessageEmbed()
        .addField(":inbox_tray: Input", "```js\n" + args.join(" ") + "```")
        .setFooter(client.config.bot.name, client.user.displayAvatarURL());
    try {
        const code = args.join(" ");
        if (!code) return message.error("eval:NOINCLUDE")
        let evaled;

        // This method is to prevent someone that you trust, open the secret shit here.
        if (code.includes(`secret`) || code.includes(`token`) || code.includes("process.env")) {
            evaled = message.translate("eval:INCLUDETOKEN");
        } else {
            evaled = await eval(code);
        }

        typeofs = typeof evaled

        if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth: 0 });

        let output = await clean(evaled);
        if (output.length > 1024) {
            embed.addField(":outbox_tray: Output", await client.util.hastebin(output)).setColor(0x7289DA);
            embed.addField(":mag: Type", "```js\n" + typeofs + "```")
            // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
        } else {
            embed.addField(":outbox_tray: Output", "```js\n" + output + "```").setColor(0x7289DA)
            embed.addField(":mag: Type", "```js\n" + typeofs + "```")
        }
        message.channel.sendTyping()
        message.channel.send({ embeds: [embed] });

    } catch (error) {
        let err = clean(error);
        if (err.length > 1024) {
            // Do the same like above if the error output was more than 1024 characters.
            embed.addField(":outbox_tray: Output", await client.util.hastebin(err)).setColor("RED");
        } else {
            embed.addField(":outbox_tray: Output", "```js\n" + err + "```").setColor("RED");
        }

        message.channel.send({ embeds: [embed] });
    }
}

exports.help = {
    name: "eval",
    description: "eval:DESCRIPTION",
    usage: "eval <code>",
    example: "eval client.commands"
}

exports.conf = {
    aliases: ["e"],
    permissions: [""],
    needperms: [""],
    developer: true
}
exports.slash = {
    data: new SlashCommandBuilder()
        .setName('eval')
        .setDescription('Eval code (Only Developer)')
        .addStringOption(option => option.setName('input')
            .setDescription('Enter a code')
            .setRequired(true)),
    async execute(interaction, client, runs) {
        const embed = new Discord.MessageEmbed()
            .addField(":inbox_tray: Input", "```js\n" + interaction.options.getString('input') + "```");
        try {
            const code = interaction.options.getString('input');
            if (!code) return interaction.reply(message.translate("eval:NOINCLUDE"));
            let evaled;

            // This method is to prevent someone that you trust, open the secret shit here.
            if (code.includes(`secret`) || code.includes(`token`) || code.includes("process.env")) {
                evaled = message.translate("eval:INCLUDETOKEN");
            } else {
                evaled = await eval(code);
            }

            typeofs = typeof evaled

            if (typeof evaled !== "string") evaled = require("util").inspect(evaled, { depth: 0 });

            let output = await clean(evaled);
            if (output.length > 1024) {
                // If the output was more than 1024 characters, we're gonna export them into the hastebin.
                embed.addField(":outbox_tray: Output", await client.util.hastebin(output)).setColor(0x7289DA);
                embed.addField(":mag: Type", "```js\n" + typeofs + "```")
                // Sometimes, the body.key will turn into undefined. It might be the API is under maintenance or broken.
            } else {
                embed.addField(":outbox_tray: Output", "```js\n" + output + "```").setColor(0x7289DA)
                embed.addField(":mag: Type", "```js\n" + typeofs + "```")
            }
            interaction.reply("Loading")
            interaction.followUp({ embeds: [embed] });


        } catch (error) {
            let err = clean(error);
            if (err.length > 1024) {
                // Do the same like above if the error output was more than 1024 characters.
                embed.addField(":outbox_tray: Output", await client.util.hastebin(err)).setColor("RED");
            } else {
                embed.addField(":outbox_tray: Output", "```js\n" + err + "```").setColor("RED");
            }

            interaction.followUp({ embeds: [embed] });
        }
    }
}

function clean(string) {
    if (typeof text === "string") {
        return string.replace(/`/g, "`" + String.fromCharCode(8203))
            .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
        return string;
    }
}