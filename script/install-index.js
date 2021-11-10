const fs = require("fs")
var config = {};
if (fs.existsSync("./config/configs.json")) {
    //if token exists
    if (fs.existsSync("./config/token.json")) {
        console.info("Config file found, skipping setup");
        return require("../system/index");
    } else {
        //if config exists but token doesn't
        console.log("Config file found!");
        console.log("but token not found Loading...");
        return require("../system/util/tokeninit");

    }
} else {
    return require("./install")
}