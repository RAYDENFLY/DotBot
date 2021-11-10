const data = {
    icon: '[DEBUG]',

    redBg: "\x1b[41m",
    redFg: "\x1b[31m",
    whiteFg: "\x1b[37m",
    greyFg: "\x1b[90m",

    reset: "\x1b[0m",
    reverse: "\x1b[7m"
};


console.old_debug = console.debug;
console.debug = function () {
    console.old_error(data.greyFg, data.icon, data.reset, data.greyFg, ...arguments, data.reset);
};
module.exports = console.debug;
