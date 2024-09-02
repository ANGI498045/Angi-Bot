const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Débannit un membre")
    .addStringOption(option =>
        option.setName("membre")
        .setDescription("Le membre à débannir")
        .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getString("membre")

        try {
            await interaction.guild.bans.remove(user);
            await interaction.reply("Membre débannit !")
        } catch (error) {
            console.error(error);
            interaction.reply({content: "Erreur en débanissant le membre", ephemeral: true});
        }
    },
};