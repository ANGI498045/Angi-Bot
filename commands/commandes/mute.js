const { SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder, GatewayIntentBits } = require("discord.js");
/*const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");
const channel = client.channels.cache.get(channelLogs); */

module.exports = {
    data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("Rend muet un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .addUserOption(option =>
        option.setName("membre")
        .setDescription("Le membre à rendre muet")
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName("durée")
        .setDescription("La durée pendant laquelle il sera muet")
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName("raison")
        .setDescription("La raison de le rendre muet")
        .setRequired(false)
    ),
    async execute(interaction) {
        const member = interaction.options.getMember("membre");
        const reason = interaction.options.getString("raison") || "aucune raison précisée";
        const duration = interaction.options.getInteger("durée" * 1000) || 9_999_999_999;

        try {
            member.timeout(duration)
            const embed = new EmbedBuilder()
                .setTitle("Mute")
                .addFields({title: `Le membre ${member} a été mute pour ${duration} milisecondes.`, value: `Raison: ${reason}`})
                .setTimestamp()
            await interaction.channel.send({embeds: [embed]});
        } catch (error) {
            console.error(error);
            await channel.send('Erreur avec la commande: "mute"');
        }
    },
};