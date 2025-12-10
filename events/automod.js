const { Events } = require("discord.js");
const {channelLogs} = require("../json/channels.json");

module.exports = {
    name: Events.MessageCreate,
    execute(message) {
    channel = message.client.channels.guild.cache.get(channelLogs)
    if (message.content.includes("noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes("Noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes('noir')) {
        message.reply(`${message.author} Pas de ça ici.`)
    }
    else if (message.content.includes("a")) {
        message.reply(`${message.author} Pas de ça ici.`)
        channel.send("a")
    }
    }
}