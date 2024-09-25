const { SlashCommandBuilder, PermissionFlagsBits,EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Rend muet un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
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
        const channel = interaction.guild.channels.cache.get(channelLogs);

        try {
            member.timeout(duration)
            const embed = new EmbedBuilder()
                .setTitle("Mute")
                .setDescription(`Le membre ${member} a été mute. Raison: ${reason}.`)
                .setTimestamp()
                .setColor(0xF68A11)
            await channel.send({embeds: [embed]});
        } catch (error) {
            console.error(error);
        }
    },
};