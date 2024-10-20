const { SlashCommandBuilder, PermissionFlagsBits, Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../../json/config.json");

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
	        await interaction.reply({content: `La commande \`${newCommand.data.name}\` a été actualisée !`, ephemeral: true});
        } catch (error) {
	        console.error(error);
            const channel = interaction.guild.channels.cache.get(channelLogs);
            const embed = new EmbedBuilder()
                .setTitle("Erreur")
                .setColor(0xC11919)   
                .setDescription("Erreur avec la commande: \`reload\`")
                .setTimestamp()
            channel.send({embeds: [embed]});
            }
            
    },
};