const data = {
    icon: '[TIPS]',

    blueBg: "\x1b[44m",
    blueFg: "\x1b[36m",
    whiteFg: "\x1b[37m",
    greenFg: "\x1b[32m",

    reset: "\x1b[0m",
    reverse: "\x1b[7m"
};
console.tips = function (isi) {
    console.log(data.greenFg, data.icon, data.reset, data.greenFg, isi, data.reset);
};
module.exports = console.tips;
