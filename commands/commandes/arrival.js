const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("arrival")
    .setDescription("Envoie un message d'arrivée")
    .addUserOption(option =>
        option.setName("membre")
        .setDescription("Le membre qui est arrivé")
    ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser("membre");
            const embed = new EmbedBuilder()
                        .addFields({name: "Nouveau Membre", value: user})
                        .setColor(0x0099ff)
                        .setTimeStamp()
            interaction.channel.send({embeds: [embed]});
        } catch (error) {
            await console.error(error);
            await interaction.reply({content: "Erreur en envoyant le message", ephemeral: true});
        }
    },
};