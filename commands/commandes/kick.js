const {  SlashCommandBuilder, PermissionFlagsBits,EmbedBuilder } = require("discord.js");
const channelLogs = require("../../config.json");

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
                const embed = new EmbedBuilder()
                    .setTitle("Expulsion")
                    .addFields({title: `Le membre ${user.username} a été expulsé.`, value: `Raison: ${reason}`})
                    .setTimestamp()
                const channel = interaction.guild.channels.cache.get(channelLogs)
                await channel.send({embeds: [embed]});
            } catch (error) {
                console.error(error)
            }
        },
};