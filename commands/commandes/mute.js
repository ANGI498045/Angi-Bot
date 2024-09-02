const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Rend muet un membre")
    .addUserOption(option =>
        option.setName("membre")
        .setDescription("Le membre à rendre muet")
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName("durée")
        .setDescription("La durée pendant laquelle il sera muet")
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName("raison")
        .setDescription("La raison de le rendre muet")
        .setRequired(false)
    ),
    async execute(interaction) {
        const member = interaction.options.getMember("membre");
        const reason = interaction.options.getString("raison") || "aucune raison précisée";
        const duration = interaction.options.getInteger("durée" * 1000) || 9_999_999_999;

        try {
            member.timeout(duration)
            return interaction.channel.send(`Le membre ${member} a été mute pour ${duration} milisecondes. Raison: ${reason}.`)
        } catch (error) {
            console.error(error);
            return interaction.reply({content: "Erreur en rendant le membre muet.", ephemeral: true});
        }
    },
};