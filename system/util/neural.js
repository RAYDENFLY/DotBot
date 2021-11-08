const { io } = require("socket.io-client");
class Neural {
    constructor(client) {
        this.client = client;
        //connect to socket io
        this.socket = io("https://drmneural.demuraaidev.repl.co");
        //client on connect
        this.socket.on("connect", () => {
            console.info("Connected to Neural DRM with id " + this.socket.id);
        });
        //client on disconnect
        this.socket.on("disconnect", () => {
            console.error("Disconnected from Neural DRM");
        });
        //listen for message from room brodcast


    }

    //send message as a function and get response to return
    send(message, callback) {
        this.socket.emit("message", message);
        this.socket.on("message", (data) => {
            callback(data);
        });
    }
    async ping() {
        await this.socket.emit("ping", "1", (response) => {
            //reutrn response without undefined
            return response;
        })
    }
    //callback

}
module.exports = Neural;
