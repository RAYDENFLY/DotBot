const readline = require('readline');
module.exports = async client => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
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

    rl.on('line', (line) => {
        if (line === 'stop') {
            return close();
        }
        console.log(eval(line))
    })
    function close() {
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
    }
}