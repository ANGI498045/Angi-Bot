const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Avertir un membre")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(options =>
            options.setName("membre")
            .setDescription("Le membre à avertir")
        )
        .addStringOption(options => 
            options.setName("raison")
            .setDescription("La raison pour laquelle tu l'avertis")
        )
}