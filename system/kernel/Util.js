const snek = require("node-superfetch");
const request = require("node-superfetch"), { post } = require("node-superfetch");
const discord = require('discord.js')

class Util {
    constructor() {
        this.parseDur = function parseDur(ms) {
            let seconds = ms / 1000;
            let days = parseInt(seconds / 86400);
            seconds = seconds % 86400;
            let hours = parseInt(seconds / 3600);
            seconds = seconds % 3600;
            let minutes = parseInt(seconds / 60);
            seconds = parseInt(seconds % 60);

            if (days) {
                return `${days} day, ${hours} hours, ${minutes} minutes`;
            } else if (hours) {
                return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
            } else if (minutes) {
                return `${minutes} minutes, ${seconds} seconds`;
            }
            return `${seconds} seconds`;
        };
        this.chunk = function chunk(array, chunkSize) {
            let temp = [];
            for (let i = 0; i < array.length; i += chunkSize) {
                temp.push(array.slice(i, i + chunkSize));
            }
            return temp;
        };
        this.hastebin = async function hastebin(code) {
            const { body } = await post("https://hastebin.com/documents").send(code);
            return hastebinurl + `/${body.key}.js`;
        }
    }
    bytesToSize(bytes) {
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        if (bytes == 0) return '0 Byte';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
    }
    MbToBytes(mb) {
        return mb * 1024 * 1024;
    }
    msToSec(ms) {
        return ms / 1000;
    }
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return window.btoa(binary);
    }
    msToTime(ms) {
        var sec = ms / 1000;
        var hours = parseInt(sec / 3600);
        sec = sec % 3600;
        var minutes = parseInt(sec / 60);
        sec = parseInt(sec % 60);
        if (hours) {
            return `${hours} hours, ${minutes} minutes, ${sec} seconds`;
        } else if (minutes) {
            return `${minutes} minutes, ${sec} seconds`;
        }
        return `${sec} seconds`;
    }
    randompassword(length) {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }
}

module.exports = Util