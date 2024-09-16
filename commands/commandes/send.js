const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
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
        const embed = new EmbedBuilder()
            .setTitle(msg)
            .setColor("0099ff")
        try {
            interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error(error)
            const channel = client.channels.cache.get(channelLogs);
            channel.send('Erreur avec la commande: "send"');
        }
        
    },
};