const snek = require("node-superfetch");
const request = require("node-superfetch"), { post } = require("node-superfetch");
const discord = require('discord.js')
const hastebinurl = require("../../config/configs.json").util.hastebin

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
            const { body } = await post(hastebinurl + "/documents").send(code);
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
    base64toArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
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
}

module.exports = Util