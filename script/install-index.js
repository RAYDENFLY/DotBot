const fs = require("fs")
if (fs.existsSync("../config/configs.json")) {
    //if token exists
    if (fs.existsSync("../config/token.json")) {
        console.info("Config file found, skipping setup");
        return require("../index.jss");
    } else {
        //if config exists but token doesn't
        console.log("Config file found!");
        console.log("Please enter your token");
        return inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'token',
                    message: 'Please enter your token',
                }
            ])
            .then((answers) => {
                fs.writeFile("../config/token.json", JSON.stringify(answers.token), function (err) {
                    if (err) {
                        return console.log(err);
                    }
                    console.log("Token file created!");

                });
            });
    }
} else {
    return require("./install")
}