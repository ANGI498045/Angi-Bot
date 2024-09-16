const { SlashCommandBuilder, PermissionFlagsBits, Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");
const channelL = client.channels.cache.get(channelLogs);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Bannit un membre")
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre à bannir")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("raison")
            .setDescription("La raison du bannissement")
            .setRequired(false)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison");

            try {
                await interaction.guild.members.ban(user.id, { reason });
                await interaction.reply({ content: `${user.username} a été banni. Raison: ${reason}.`});
                const embed = new EmbedBuilder()
                    .setTitle("Bannissement")
                    .addFields({title: `Le membre ${user.username} a été banni.`, value: `Raison: ${reason}.`});
                await channelL.send({embeds: [embed]});
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: `Erreur en bannissant le membre.`, ephemeral: true});
                await channelL.send('Erreur avec la commande: "ban"');
            }
        },
};