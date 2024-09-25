const { SlashCommandBuilder } = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("online")
    .setDescription("Vérifie si le bot est online"),
    async execute(interaction) {
        try {
            await interaction.reply("Je suis bien connecté !");
        } catch (error) {
            console.error(error);
        }
    },
}