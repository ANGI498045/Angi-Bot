const {  SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulse un membre.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre à expulser")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
            .setDescription("La raison de l'expulsion.")
            .setRequired(false)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison") || "Aucune raison précisée";
            try {
                const member = await interaction.guild.members.fetch(user.id);
                await member.kick(reason);
                await interaction.reply(`Le membre ${user.username} a été expulsé. Raison: ${reason}.`);
            } catch (error) {
                console.error(error)
                interaction.reply({content: `Erreur en bannissant le membre.`, ephemeral: true});
            }
        },
};