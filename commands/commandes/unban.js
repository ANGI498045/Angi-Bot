const { SlashCommandBuilder, PermissionFlagsBits, Client, GatewayIntentBits } = require("discord.js");
/*const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const { ChannelLogs } = require("../../config.json")*/

module.exports = {
    data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Débannit un membre")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addStringOption(option =>
        option.setName("membre")
        .setDescription("Le membre à débannir")
        .setRequired(true)
    ),
    async execute(interaction) {
        const user = interaction.options.getString("membre")

        try {
            await interaction.guild.bans.remove(user);
            await interaction.reply("Membre débannit !")
        } catch (error) {
            console.error(error);
            //const channel = client.channels.cache.get(ChannelLogs);
            //channel.send('Erreur avec la commande: "unban"');
        }
    },
};