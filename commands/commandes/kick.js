const {  SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");
const channelL = client.channels.cache.get(channelLogs);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Expulse un membre.")
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre à expulser")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
            .setDescription("La raison de l'expulsion.")
            .setRequired(false)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison") || "Aucune raison précisée";
            try {
                const member = await interaction.guild.members.fetch(user.id);
                await member.kick(reason);
                await interaction.reply(`Le membre ${user.username} a été expulsé. Raison: ${reason}.`);
                const embed = new EmbedBuilder()
                    .setTitle("Expulsion")
                    .addFields({title: `Le membre ${user.username} a été expulsé.`, value: `Raison: ${reason}`})
                    .setTimestamp()
                await channelL.send({embeds: [embed]});
            } catch (error) {
                console.error(error)
                await interaction.reply({content: `Erreur en bannissant le membre.`, ephemeral: true});
                await channelL.send('Erreur avec la commande: "kick"');
            }
        },
};