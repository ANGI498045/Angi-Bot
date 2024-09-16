const { SlashCommandBuilder, PermissionFlagsBits, Client } = require("discord.js");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const {channelLogs} = require("../../config.json");

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
	        await interaction.reply({ content: `La commande \`${newCommand.data.name}\` a été actualisée !`, ephemeral: true});
            const channel = client.channels.cache.get(channelLogs);
            await channel.send(`Actualisation de la commande \`${newCommand.data.name}\``);
        } catch (error) {
	        console.error(error);
	        await interaction.reply(`Erreur en rechargeant la commande \`${command.data.name}\`:\n\`${error.message}\``);
            const channel = client.channels.cache.get(channelLogs);
            await channel.send(`Erreur avec la commande: "reload" (rechargement de la commande \`${command.data.name}\`)`);
        }
            
    },
};