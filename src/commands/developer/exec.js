const Discord = require("discord.js")
const process = require("child_process")
exports.run = async (client, message, args, runs, plugin) => {
    message.sendT("exec:WAIT").then(m => m.delete({ timeout: 2000 }));

    process.exec(args.join(" "), (error, stdout) => {
        let response = (error || stdout);
        message.channel.send(`\`\`\`${response}\`\`\``, { code: "asciidoc", split: "\n" }).catch(err => message.channel.send(err));
    })
    return;
}

exports.help = {
    name: "exec",
    description: "exec:DESC",
    usage: "exec <text>",
    example: "exec -h"
}
exports.slash = false;

exports.conf = {
    aliases: ["$"],
    permissions: [""],
    needperms: [""],
    developer: true
}