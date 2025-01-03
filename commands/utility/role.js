const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("role")
        .setDescription("T'envoie le message auquel réagir pour obtenir ton rôle"),

    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle("Choisis tes jeux !")
            .addFields({name: "Valorant:", value: "<:valorant:1308839535068577792>"})
            .addFields({name: "Counter-Strike:", value: "<:cs2:1308839633206902854>"})
            .addFields({name: "GTA:", value: "<:gta:1308839855601619024>"})
            .addFields({name: "Minecraft:", value: "<:mc:1308839939277979689>"})
            .setColor(0x0099ff)
        interaction.reply({embeds: [embed]});
    }
}