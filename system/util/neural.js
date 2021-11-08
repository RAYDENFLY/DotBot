const { io } = require("socket.io-client");
class Neural {
    constructor(client) {
        this.client = client;
        //connect to socket io
        this.socket = io("https://drmneural.demuraaidev.repl.co");
        //client on connect
        this.socket.on("connect", () => {
            console.log("Connected to Neural DRM with id " + this.socket.id);
        });
        //client on disconnect
        this.socket.on("disconnect", () => {
            console.info("Disconnected from Neural DRM with id " + this.socket.id);
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
}
module.exports = Neural;
