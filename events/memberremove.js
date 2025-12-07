const { Events, EmbedBuilder } = require("discord.js");
const interaction = require("./interaction");

module.exports = {
    name: Events.GuildMemberRemove,
    once: true,
    execute(client) {
    const embed = new EmbedBuilder()
        .addFields({name: "Départ", value:`${member.user.tag} a quitté le serveur...`})
        .setColor(0x0099ff)
        .setTimestamp()
    const channel = interaction.guild.channels.cache.get(channelPlane);
    if (member.user.bot) return;
    channel.send({ embeds: [embed] });
    console.log("member -")
    }
}