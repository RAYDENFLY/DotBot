const Discord = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

let jsoning = require("jsoning");
let db = new jsoning("database/global.json");

exports.run = async (client, message, args, runs) => {
    let bot = client.config.bot;
    let globalprefix = message.guild.data.prefix
    let prefix = globalprefix || client.config.bot.prefix;
    let nama = bot.name;
    let id = client.user.id
    let log = await db.get("log")


    if (!args[0]) {
        let module = Array.from(client.helps.values());
        let description1 = message.translate("help:DESCRIPTION1");
        let description2 = message.translate("help:DESCRIPTION2");

        if (!client.config.bot.owner.includes(message.author.id)) module = module.filter(x => !x.hide);
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(nama + " Menu")
            .setAuthor(nama, client.user.displayAvatarURL())
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(description1 + ` \`${prefix}help\` ` + description2 + ` \`${prefix}help [command]\`` + "\n```js\nLog:\n" + log + "```")
            .setFooter(`DemuraAI.`, client.user.displayAvatarURL())
            .setTimestamp(new Date())
        const invite = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Report')
                    .setCustomId("report")
                    .setStyle('DANGER')
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Invite')
                    .setURL(`https://discord.com/api/oauth2/authorize?client_id=${id}&permissions=139921391207&scope=bot%20applications.commands`)
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Support Server')
                    .setURL(`https://discord.gg/nC7XxTrVMT`)
                    .setStyle('LINK')
            )
            .addComponents(
                new MessageButton()
                    .setLabel('Website')
                    .setURL(`https://dotbotwebsite.demuraaidev.repl.co/`)
                    .setStyle('LINK')
            )


        for (const mod of module) {
            const nametl = message.translate(mod.name);
            const weh = `${mod.emoji} ${nametl}`
            embed.addField(`${weh}`, mod.cmds.map(x => `\`${x}\``).join(" | "));
        }
        const filter = i => i.customId === 'report' && i.user.id === message.author.id
        const collector = message.channel.createMessageComponentCollector({ filter, max: 1 });
        collector.on('collect', async i => {
            if (i.customId === 'report') {
                i.reply({ content: "pls report" })
                runs("report")
            }
        });
        return message.channel.send({ embeds: [embed], components: [invite] });
    } else {
        let cmd = args[0];

        if (client.commands.has(cmd) || client.commands.get(client.aliases.get(cmd))) {
            let command = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));
            let name = command.help.name;
            let desc = message.translate(command.help.description);
            let cooldown = command.conf.cooldown + " second(s)";
            let aliases = command.conf.aliases.join(", ") ? command.conf.aliases.join(", ") : "No aliases provided.";
            let usage = command.help.usage ? command.help.usage : "No usage provided.";
            let example = command.help.example ? command.help.example : "No example provided.";

            let embed = new Discord.MessageEmbed()
                .setColor(0x7289DA)
                .setTitle(name)
                .setDescription(desc)
                .setFooter("[] optional, <> required. Don't includes these things while typing a command.")
                .addField("Cooldown", cooldown)
                .addField("Aliases", aliases, true)
                .addField("Usage", usage, true)
                .addField("Example", example, true)

            return message.channel.send({ embeds: [embed] });

        } else {
            let notfound = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Unknown command.")
            return message.channel.send({ embeds: [notfound] });
        }

    }
    //create hello world
}

exports.slash = false

exports.help = {
    name: "help",
    description: "Show a command list.",
    usage: "help [command]",
    example: "help verify"
}

exports.conf = {
    aliases: ["?", "menu"],
    cooldown: 5,
    developer: false,
    permissions: [""],
    needperms: [""],
}