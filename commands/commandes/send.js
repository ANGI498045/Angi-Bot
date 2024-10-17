const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Envoie un message défini")
    .addStringOption(option => 
        option.setName("message")
        .setDescription("Le message à envoyer")
        .setRequired(true)
    ),
    async execute(interaction) {
        const msg = interaction.options.getString("message");
        const embed = new EmbedBuilder()
            .addFields({ title: "Nouveau Membre", value: msg })
            .setColor("0099ff")
            .setTimestamp()
        interaction.channel.send({ embeds: [embed] });
    },
};