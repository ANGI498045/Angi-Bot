const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { EmbedBuilder } = require("@discordjs/builders");
const {channelLogs} = require("../../json/channels.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unmute")
        .setDescription("Unmute un membre")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre à unmute")
        ),
    async execute(interaction) {
        const member = interaction.options.getMember("membre");
        const channel = interaction.guild.channels.cache.get(channelLogs);
        const duration = 1;
        try {
            if (member.roles.cache.has("1273620377318326293")) {
                interaction.reply({content: "Tu ne peux pas unmute un modérateur !", ephemeral: true});
                return;
            }
            if (member.roles.cache.has("1273620410226708603")) {
                interaction.reply({content: "Tu ne peux pas unmute un modérateur !", ephemeral: true});
                return;
            }
            if (member.roles.cache.has("1209450064720957490")) {
                interaction.reply({content: "Tu ne peux pas unmute un modérateur !", ephemeral: true});
                return;
            }
            if (member.roles.cache.has("1209449963071873044")) {
                interaction.reply({content: "Tu ne peux pas unmute Angi !", ephemeral: true});
                return;
            }
            if (member.user.bot) {
                interaction.reply({content: "Tu ne peux pas unmute un Bot !", ephemeral: true});
                return;
            }
            member.timeout(duration);
            const embed = new EmbedBuilder()
                .setTitle("Unmute")
                .setDescription(`Le membre ${member} a été unmute.`)
                .setTimestamp()
                .setColor(0xF68A11)
            await channel.send({embeds: [embed]})
            await interaction.reply({content: `Membre ${member} unmute !`, ephemeral: true});
        } catch (error) {
            console.error(error)
        }
    }
}