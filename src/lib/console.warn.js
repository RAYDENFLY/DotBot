const data = {
    icon: '[WARN]',

    yellowBg: "\x1b[43m",
    yellowFg: "\x1b[33m",
    whiteFg: "\x1b[37m",

    reset: "\x1b[0m",
    reverse: "\x1b[7m"
};
console.old_warn = console.warn;

console.warn = function () {
    console.old_warn(data.yellowFg, data.icon, data.reset, data.yellowFg, ...arguments, data.reset);
};
module.exports = console.warn;
