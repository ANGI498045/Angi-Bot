const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("report")
        .setDescription("crée un rapport, envoyé au staff")
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre à reporter")
            .setRequired(true)
        )
        .addStringOption(option => 
            option.setName("raison")
            .setDescription("la justification de ton report")
            .setRequired(true)
        )
        .addUserOption(option =>
            option.setName("victime")
            .setDescription("La personne qui crée ce rapport")
            .setRequired(false)
        ),
        async execute(interaction) {
            
        }
}