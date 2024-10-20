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
        try {
            const embed = new EmbedBuilder()
            .setTitle(msg)
            .setColor(0x0099ff);
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error)
        }
        
    },
};