const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("send")
    .setDescription("Envoie un message défini")
    .addStringOption(option => 
        option.setName("message")
        .setDescription("Le message à envoyer")
        .setRequired(true)
    ),
    async execute(interaction) {
        const msg = interaction.options.getString("message");
        
        try {
            const embed = new EmbedBuilder()
            .setTitle(msg)
            .setColor(0x0099ff);
            await interaction.reply({ embeds: [embed] });
            const embed3 = new EmbedBuilder()
                .setTitle("Commande")
                .setDescription("La commande \`send\` a été utilisée.")
                .setColor(0x0099ff)
                .setTimestamp();
            const channel = interaction.guild.channels.cache.get(channelLogs);
            await channel.send({embeds: [embed3]});
        } catch (error) {
            console.error(error)
            const embed2 = new EmbedBuilder()
                .setTitle("Erreur")
                .setColor(0xC11919)
                .setDescription("Erreur avec la commande: \`send\`")
                .setTimestamp()
            const channel = interaction.guild.channels.cache.get(channelLogs);
            await channel.send({embeds: [embed2]});
        }
        
    },
};