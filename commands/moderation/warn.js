const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Avertir un membre")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(options =>
            options.setName("membre")
            .setDescription("Le membre à avertir")
            .setRequired(true)
        )
        .addStringOption(options => 
            options.setName("raison")
            .setDescription("La raison pour laquelle tu l'avertis")
            .setRequired(false)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison" || "Aucune raison précisée");
            const member = interaction.guild.members.fetch(user.id);
            const embed = new EmbedBuilder()
                .setTitle("Avertissement")
                .setDescription(`Le membre \`${member.user}\` a reçu un avertissement. Raison: \`${reason}\` `)
                .setColor(0xF68A11)
                .setTimestamp()

            await interaction.reply({embeds: [embed]});
        }
}