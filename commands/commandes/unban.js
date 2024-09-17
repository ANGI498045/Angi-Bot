const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const { ChannelLogs } = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Débannit un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>
        option.setName("membre")
        .setDescription("Le membre à débannir")
        .setRequired(true)
    ),
    async execute(interaction) {
        const channel = interaction.guild.channels.cache.get(ChannelLogs);
        const user = interaction.options.getString("membre")
        try {
            await interaction.guild.bans.remove(user);
            const embed = new EmbedBuilder()
                .setTitle("Débanissement")
                .setDescription(`Le membre ${user} a été débanni.`)
                .setTimestamp()
                .setColor(0x0099ff)
            await channel.send({embeds: [embed]});
        } catch (error) {
            console.error(error);
            const embed2 = new EmbedBuilder()
                .setTitle("Erreur")
                .setColor(0xC11919)
                .setDescription("Erreur avec la commande: \`unban\`")
                .setTimestamp()
            await channel.send({embeds: [embed2]});
        }
    },
};