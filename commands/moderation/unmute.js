const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { execute } = require("./mute");
const { EmbedBuilder } = require("@discordjs/builders");
const channelLogs = require("../../config.json");

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
        const channel = interaction.guild.channels.cache.get(channelLogs)
        try {
            member.timeout("1")
            const embed = new EmbedBuilder()
                .setTitle("Unmute")
                .setDescription(`Le membre ${member} a été unmute.`)
                .setTimestamp()
                .setColor(0xF68A11)
            await channel.send({embeds: [embed]})
            await interaction.reply({content: "Membre unmute !", ephemeral: true});
        } catch (error) {
            console.error(error)
        }
    }
}