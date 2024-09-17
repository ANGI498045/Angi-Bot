const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder, PermissionFlagsBits, Client, GatewayIntentBits } = require("discord.js");
/*const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");
const channel = client.channels.cache.get(channelLogs) */

module.exports = {
    data: new SlashCommandBuilder()
    .setName("arrival")
    .setDescription("Envoie un message d'arrivée")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addUserOption(option =>
        option.setName("membre")
        .setDescription("Le membre qui est arrivé")
    ),
    async execute(interaction) {
        try {
            const user = interaction.options.getUser("membre");
            const embed = new EmbedBuilder()
            .addFields({name: "Nouveau Membre", value: `${user} a rejoint le serveur ! Bienvenue !`})
            .setColor(0x0099ff)
            .setTimestamp()
            interaction.channel.send({ embeds: [embed] });
        } catch (error) {
            await console.error(error);
            //await channel.send('Erreur avec la commande: "arrival"');
        }
    },
};