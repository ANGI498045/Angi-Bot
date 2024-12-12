const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../../json/channels.json");
const {clientId} = require("../../json/config.json");

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
            const member = await interaction.guild.members.fetch(user.id);

            try {
                if (member.roles.cache.has("1209450064720957490")) {
                    interaction.reply({content: "Tu ne peux pas ban un admin !", ephemeral: true});
                    return;
                }
                if (member.roles.cache.has("1209449963071873044")) {
                    interaction.reply({content: "Tu ne peux pas ban Angi !", ephemeral: true});
                    return;
                }
                if (member.user.id === clientId) {
                    interaction.reply({content: "Tu ne peux pas me ban !", ephemeral: true});
                    return;
                }
                await interaction.guild.members.ban(user.id, { reason });
                const embed = new EmbedBuilder()
                    .setTitle("Bannissement")
                    .setDescription(`Le membre ${user} a été banni. Raison: ${reason}`)
                    .setTimestamp()
                    .setColor(0xF68A11)
                await channel.send({embeds: [embed]});
                await interaction.reply({embeds: [embed]});
            } catch (error) {
                console.error(error);
            }
        },
};