const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberRemove,
    once: true,
    execute(client) {
    const embed = new EmbedBuilder()
        .addFields({name: "Départ", value:`${member.user.tag} a quitté le serveur...`})
        .setColor(0x0099ff)
        .setTimestamp()
    const channel = client.channels.cache.get(channelPlane);
    if (member.user.bot) return;
    channel.send({ embeds: [embed] });
    console.log("member -")
    }
}