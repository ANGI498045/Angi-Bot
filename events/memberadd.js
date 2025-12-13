const { Events, EmbedBuilder } = require("discord.js");
const {channelPlane, channelGen} = require("../json/channels.json");
const {roleView, roleBot} = require("../json/role.json");

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(member) {
    const embed = new EmbedBuilder()
        .addFields({name: "Nouveau Membre", value: `${member.user} a rejoint le serveur ! Bienvenue !`})
        .setColor(0x0099ff)
        .setTimestamp()
    if (!member.user.bot) {
        member.roles.add(roleView);
        if (member.user.id === "994167928989696020") return;
        const channel = member.client.channels.cache.get(channelPlane);
        channel.send({embeds: [embed]});
        const channel2 = member.client.channels.cache.get(channelGen);
        channel2.send(`Bienvenue ${member} !`);
    }
    if (member.user.bot) member.roles.add(roleBot);
    console.log("member +")
    }
}