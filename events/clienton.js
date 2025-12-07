const {Events, ActivityType} = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Bot ${client.user.tag} connecté !`)
        client.user.setActivity({type: ActivityType.Custom, name: "status", state: "Veille sur les membres de la Galette"});
    },
};