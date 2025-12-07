const { Events, EmbedBuilder } = require("discord.js");
const {channelLogs} = require("../json/channels.json");

module.exports = {
    name: Events.InteractionCreate,
    execute(interaction) {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    const channel = interaction.guild.channels.cache.get(channelLogs);
    if (!command) {
        console.error({content: `La commande ${interaction.commandName} n'existe pas.`, ephemeral: true});
        return;
    }
    console.log(interaction.commandName)

    try {
        command.execute(interaction);
        if (interaction.commandName === "ban") {
            return;   }
        else if (interaction.commandName === "kick") {
            return;
        }
        else if (interaction.commandName === "mute") {
            return;
        }
        else if (interaction.commandName === "unban") {
            return;
        }
        else if (interaction.commandName === "unmute") {
            return;
        }
        else if (interaction.commandName === "warn") {
            return;
        }
        const embedC = new EmbedBuilder()
            .setTitle("Commande")
            .setDescription(`La commande \`${interaction.commandName}\` a été utilisée par ${interaction.member.user}.`)
            .setColor(0x0099ff)
            .setTimestamp();
        channel.send({embeds: [embedC]});
    } catch (error) {
        console.error(error);
        interaction.reply({content: `Erreur avec la commande: ${interaction.commandName}`, ephemeral: true});
        const embedErr = new EmbedBuilder()
                .setTitle("Erreur")
                .setDescription(`Erreur avec la commande \`${interaction.commandName}\`.`)
                .setTimestamp()
                .setColor(0xC11919);
        channel.send({embeds: [embedErr]});
    }
    }
}