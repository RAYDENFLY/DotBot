const { MongoClient } = require('mongodb');
const configs = require("../../config/configs.json")
class database {
    constructor(config) {
        //connect to mongodb
        this.config = config
        this.client = new MongoClient(configs.mongodb.uri);
        this.client.connect(err => {
            this.collection = this.client.db(configs.mongodb.db)
            console.info("Connected to mongodb");
        });


    }
    //get latency and resolv without promise return is ms
    getlatency() {
        return this.client.db(configs.mongodb.db).command({ ping: 1 }).then(data => {
            return data.serverInfo.ping;
        })
    }
    closedb() {
        this.client.close();
    }

    checkcollection(collectionname) {
        return this.collection.listCollections({ name: collectionname }).toArray().then(collections => {
            if (collections.length > 0) {
                return true;
            }
            else {
                return false;
            }
        })
    }
    checkifdbexist() {
        return this.client.db(configs.mongodb.db).listCollections().toArray().then(collections => {
            if (collections.length > 0) {
                //create db
                return true;
            }
            else {
                return false;
            }
        })
    }
    getcollection(collectionname) {
        return this.collection.collection(collectionname);
    }
    getcollectionlist() {
        return this.collection.listCollections().toArray();
    }
    getvalue(collectionname, key) {
        return this.getcollection(collectionname).findOne({ "guildid": key }).then(data => {
            if (data) {
                return data.value;
            }
            else {
                return null;
            }
        })
    }
    insert(collectionname, data) {
        return this.getcollection(collectionname).insertOne(data);
    }
    delete(collectionname, data) {
        return this.getcollection(collectionname).deleteOne(data);
    }
    iftextinclude(collectionname, text) {
        return this.getcollection(collectionname).findOne({ text: text }).then(data => {
            if (data) {
                return true;
            }
            else {
                return false;
            }
        })
    }
    getquery(collectionname, query) {
        return this.getcollection(collectionname).find(query).toArray();
    }
    ifqueryhas(collectionname, query) {
        return this.getcollection(collectionname).find(query).toArray().then(data => {
            if (data.length > 0) {
                return true;
            }
            else {
                return false;
            }
        })
    }



}
module.exports = database;