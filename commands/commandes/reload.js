const { SlashCommandBuilder, PermissionFlagsBits, Client, GatewayIntentBits } = require("discord.js");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");
const channel = client.channels.cache.get(channelLogs);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Actualise une commande")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => 
            option.setName("commande")
            .setDescription("La commande à actualiser")
            .setRequired(true)),
    async execute(interaction) {
            const commandName = interaction.options.getString("commande", true).toLowerCase();
            const command = interaction.client.commands.get(commandName);

            if (!command) {
                return interaction.reply({ content: `La commande ${commandName} n'existe pas.`, ephemeral: true});
            }

            delete require.cache[require.resolve(`./${command.data.name}.js`)];

        try {
	        const newCommand = require(`./${command.data.name}.js`);
	        interaction.client.commands.set(newCommand.data.name, newCommand);
	        await channel.send(`La commande \`${newCommand.data.name}\` a été actualisée !`);
        } catch (error) {
	        console.error(error);
            const channel = client.channels.cache.get(channelLogs);
            await channel.send(`Erreur avec la commande: "reload" (rechargement de la commande \`${command.data.name}\`)`);
        }
            
    },
};