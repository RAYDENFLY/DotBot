const { execSync } = require('child_process')
try {
    require('dotenv/config')
} catch (error) {
    console.error("dependency not found")
    console.error("Calling npm to install")
    execSync("npm install")
    console.info("dependency installed")
    console.info("Pls Restart bot")
    process.exit(0)
}
if (process.argv[2] === '-d' || process.argv[2] === '--docker') {
    if (process.env.DOCKER === true) {
        console.log('Running in docker mode');
        return require('./script/docker');
    }
} else if (process.env.HEROKU === true) {
    console.log('Running in heroku mode');
    require('./script/heroku');
} else {
    console.log('Running in local mode');
    require('./script/install-index.js');
}

//require("./script/install-index")
