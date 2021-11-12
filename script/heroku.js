console.log("Run in heroku mode")
const defaulttconfig = require("../config/configs.example.json")
var config = {
    bot: {
        owner: []
    },
    lavalink: {},
    util: {},
    mongodb: {},
    spotify: {},
    health: {},
    osu: {},
    config: {},
};
var token = {};
if (process.env.HEROKU === true) {
    config.version = process.env.VERSION_BOT;
    config.bot.name = process.env.BOT_NAME;
    config.bot.owner = process.env.OWNER_ID.split(",");
    config.bot["owner-name"] = process.env.OWNER_NAME;
    config.bot.prefix = process.env.PREFIX;
    config.bot.slash = process.env.SLASH;
    config.spotify.client_id = process.env.SPOTIFY_CLIENT_ID;
    config.spotify.secret = process.env.SPOTIFY_SECRET;
    config.lavalink.host = process.env.LAVALINK_HOST || "localhost";
    config.lavalink.port = process.env.LAVALINK_PORT || 2333;
    config.lavalink.password = process.env.LAVALINK_PASSWORD || "dotbotproject";
    config.util.hastebin = process.env.HASTEBIN || "https://hastebin.com";
    config.sentry = process.env.SENTRY || "";
    config.util["kusonime-api"] = "https://Kusonime-API.demuraaidev.repl.co";
    config.kernel = defaulttconfig.kernel
    config["kernel-version"] = defaulttconfig["kernel-version"];
    config.mongodb.uri = process.env.MONGODB_URI;
    config.health.enabled = process.env.HEALTH_ENABLED || true;
    config.health.ram = process.env.HEALTH_RAM || "150";
    config.health.interval = process.env.HEALTH_INTERVAL || "2000";
    config.osu.apikey = process.env.OSU_API_KEY;
    token.token = process.env.TOKEN;
    config.config.version = "2";
    var json = JSON.stringify(config);
    fs.writeFile("./config/configs.json", json, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
    var tokenn = JSON.stringify(token);
    fs.writeFile("./config/token.json", tokenn, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
    require("../system/index")
    console.log("Config file updated on heroku mode")
}