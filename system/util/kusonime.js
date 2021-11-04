const Discord = require('discord.js');
const axios = require('axios');

class Kusonime {
    constructor(client) {
        this.client = client;
    }

    getBySearch(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {

                const response = await axios.get(`https://Kusonime-API.demuraaidev.repl.co/api/cari/${query}`);
                const data = response.data;

                if (data.length === 0) return message.reply(`Tidak ditemukan dengan teks ${query}!`)
                let chunk = this.client.util.chunk(data, 5);
                let embed = new Discord.MessageEmbed()
                    .setTitle(`Hasil Pencarian dari ${query}`)
                    .setColor(this.client.warna.kato)
                    .setDescription(chunk[0].map((a, i) => `${i + 1}. ${a.title}`).join('\n'))

                let mEmbed = await message.channel.send({ embeds: [embed] });
                let alertBed = await message.reply('pilih untuk melanjutkan!');
                const msg_filter = (m) => m.author.id === message.author.id;
                const request = await message.channel.awaitMessages({ filter: msg_filter, time: 60_000, max: 1 });

                const answer = request.first().content;
                this.getDetail(chunk[0][answer - 1].link.endpoint, message);
                fullfill(chunk[0][answer - 1].link.endpoint);

                await mEmbed.delete();
                await alertBed.delete();

            } catch (err) {
                reject(err);
                message.channel.send(err.message);
            };


        });
    };

    getDetail(query, message) {
        return new Promise(async (fullfill, reject) => {
            try {

                const response = await axios.get(`https://Kusonime-API.demuraaidev.repl.co/api/anime/${query}`);
                const data = response.data;

                let embed = new Discord.MessageEmbed()
                    .setTitle(data.title)
                    .setColor(this.client.warna.kato)
                    .setDescription(data.sinopsis.slice(0, 2048))
                    .setImage(data.thumbnail)
                    .addField("Japanese", data.japanese, true)
                    .addField('Genre', data.genre.map((a, i) => `[${a.name}](${a.url})`).join(', '), true)
                    .addField('Season', `[${data.season.name}](${data.season.url})`, true)
                    .addField('Producers', data.producers.join(', '), true)
                    .addField('Total Eps', data.total_eps, true)
                    .addField('Score', data.score, true)

                await message.channel.send({ embeds: [embed] })
                for (let eachTitle of data.list_download) {

                    const temp = [];
                    const dlEmbed = new Discord.MessageEmbed()
                        .setColor("GREEN")
                        .setAuthor(eachTitle[0], undefined, 'https://kusonime.com/' + query);

                    for (let eachResolution of eachTitle[1]) {
                        const tRes = `**${eachResolution.resolusi}**\n${eachResolution.link_download.map((a, i) => `[${a.platform}](${a.link})`).join('\n')}`;
                        temp.push(tRes);
                    }

                    dlEmbed.setDescription(temp.toString());
                    message.channel.send({ embeds: [dlEmbed] });

                }


            } catch (error) {

                reject(error);
                message.channel.send(error.message);

            }


        });
    };

};

module.exports = Kusonime;