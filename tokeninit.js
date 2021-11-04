'use strict';
var inquirer = require('inquirer');
var fs = require("fs")
var config = {};

const questions = [
    {
        type: 'input',
        name: 'token',
        message: "Enter the Token!",
    }
];

inquirer.prompt(questions).then((answers) => {
    config.token = answers.token;
    var json = JSON.stringify(config);
    fs.writeFile("./config/token.json", json, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    })
    console.log("token file created!");
});



