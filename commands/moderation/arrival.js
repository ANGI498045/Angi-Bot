const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("arrival")
    .setDescription("Envoie un message d'arrivée")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option.setName("membre")
        .setDescription("Le membre qui est arrivé")
        .setRequired(true)
    ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser("membre");
            const embed = new EmbedBuilder()
            .addFields({name: "Nouveau Membre", value: `${user} a rejoint le serveur ! Bienvenue !`})
            .setColor(0x0099ff)
            .setTimestamp()
            await interaction.channel.send({embeds: [embed]});
        } catch (error) {
            console.error(error);
        }
    },
};