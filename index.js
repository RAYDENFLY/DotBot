require('dotenv').config()
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
