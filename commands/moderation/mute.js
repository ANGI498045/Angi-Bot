const { SlashCommandBuilder, PermissionFlagsBits,EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Rend muet un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
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
        const duration = interaction.options.getInteger("durée") || 1000000;
        const duration1 = duration * 1000;
        const channel = interaction.guild.channels.cache.get(channelLogs);

        try {
            member.timeout(duration1)
            const embed = new EmbedBuilder()
                .setTitle("Mute")
                .setDescription(`Le membre ${member} a été mute pour \`${duration}\` secondes. Raison: \`${reason}\`.`)
                .setTimestamp()
                .setColor(0xF68A11)
            await channel.send({embeds: [embed]});
            await interaction.reply({content: `Membre ${member} rendu muet pour ${duration}s: ${reason}.`, ephemeral: true});
        } catch (error) {
            console.error(error);
        }
    },
};