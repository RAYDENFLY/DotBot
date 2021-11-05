const readline = require('readline');
module.exports = async client => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'CMD> '
    });
    //confirm exit
    rl.on('SIGINT', () => {

        setTimeout(() => {
            console.warn("Closing database...")
            client.db.client.close()
            setTimeout(() => {
                console.warn("Closing client...")
                rl.close();
                setTimeout(() => {
                    console.warn("Closing server...")
                    setTimeout(() => {
                        console.error("Closing...")
                        process.exit(0);
                    }, 1000);
                }, 1000);
            }, 1000)
        }, 1000);
        console.error('Starting closing');

    });

    setTimeout(() => {
        rl.prompt();
    }, 10000);

    rl.on('line', (line) => {
        console.log(eval(line))
        rl.prompt();
    })
}