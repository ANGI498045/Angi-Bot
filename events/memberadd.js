const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    once: true,
    execute(client) {
    const embed = new EmbedBuilder()
        .addFields({name: "Nouveau Membre", value: `${member.user} a rejoint le serveur ! Bienvenue !`})
        .setColor(0x0099ff)
        .setTimestamp()
    if (!member.user.bot) {
        member.roles.add(roleView);
        if (member.user.id === "994167928989696020") return;
        const channel = client.channels.cache.get(channelPlane);
        channel.send({embeds: [embed]});
        const channel2 = client.channels.cache.get(channelGen);
        channel2.send(`Bienvenue ${member} !`);
    }
    if (member.user.bot) member.roles.add(roleBot);
    console.log("member +")
    }
}