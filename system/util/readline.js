const readline = require('readline');
module.exports = async client => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'CMD> '
    });
    setTimeout(() => {
        rl.prompt();
    }, 6000);

    rl.on('line', (line) => {
        console.log(eval(line))
        rl.prompt();
    }).on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
    });
}