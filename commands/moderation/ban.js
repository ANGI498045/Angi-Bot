const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../../config.json");

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
            const channel = interaction.guild.channels.cache.get(channelLogs)
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison");

            try {
                await interaction.guild.members.ban(user.id, { reason });
                const embed = new EmbedBuilder()
                    .setTitle("Bannissement")
                    .setDescription(`Le membre ${user} a été banni. Raison: ${reason}`)
                    .setTimestamp()
                    .setColor(0xF68A11)
                await channel.send({embeds: [embed]});
                await interaction.reply({content: `Membre ${user} bannit: ${reason}.`, ephemeral: true});
            } catch (error) {
                console.error(error);
            }
        },
};