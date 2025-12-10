const { Events } = require("discord.js");
module.exports = {
    name: Events.MessageCreate,
    execute(message) {
    if (message.content.includes("noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes("Noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes('noir')) {
        message.reply(`${message.author} Pas de ça ici.`)
    }
    else if (message.content.includes("pute")) {
        message.reply(`${message.author} Pas de ça ici.`)
    }
    }
}