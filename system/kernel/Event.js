const { readdirSync } = require("fs");

module.exports = client => {
    const events = readdirSync("./system/events/client/");
    for (let event of events) {
        let file = require(`../events/client/${event}`);
        client.on(event.split(".")[0], (...args) => file(client, ...args));
    }
}