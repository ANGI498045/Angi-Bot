const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: true,
    execute(client) {
    if (message.content.includes("noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes("Noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    }
}