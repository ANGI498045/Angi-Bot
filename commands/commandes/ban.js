const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bannit un membre")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre à bannir")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
            .setDescription("La raison du bannissement")
            .setRequired(false)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison");

            try {
                await interaction.guild.members.ban(user.id, { reason });
                await interaction.reply({ content: `${user.username} a été banni. Raison: ${reason}.`});
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Erreur en bannissant le membre.`, ephemeral: true});
            }
        },
};