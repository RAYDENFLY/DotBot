exports.run = async (client, message, input) => {
    const libs = require("./src/lib")
    const lib = new libs
    if (!input) return message.channel.send("Need input")
    message.channel.send("Your input is " + input)
    lib.console("Runs")
    return "test complete"
}

exports.plugin = {
    name: "drn",
    type: "plugin",
    version: "1.0"
}
exports.config = {
    developer: true
}