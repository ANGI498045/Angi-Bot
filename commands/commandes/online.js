const { SlashCommandBuilder, Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("online")
    .setDescription("Vérifie si le bot est online"),
    async execute(interaction) {
        try {
            await interaction.reply("Je suis bien connecté !")
        } catch (error) {
            console.error(error)
            const channel = client.channels.cache.get(channelLogs);
            channel.send('Erreur avec la commande "online"');
        }
    },
}