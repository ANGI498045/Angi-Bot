const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { channelLogs } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Débannit un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption(option =>
        option.setName("membre")
        .setDescription("Le membre à débannir")
        .setRequired(true)
    ),
    async execute(interaction) {
        const channel = interaction.guild.channels.cache.get(channelLogs);
        const user = interaction.options.getUser("membre")
        try {
            await interaction.guild.bans.remove(user);
            const embed = new EmbedBuilder()
                .setTitle("Débanissement")
                .setDescription(`Le membre ${user} a été débanni.`)
                .setTimestamp()
                .setColor(0xF68A11)
            await channel.send({embeds: [embed]});
        } catch (error) {
            console.error(error);
        }
    },
};