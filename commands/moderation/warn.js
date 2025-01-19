const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const {clientId} = require("../../json/config.json");
const {roleAngi, roleBot} = require("../../json/role.json");
const {channelLogs} = require("../../json/channels.json");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("warn")
        .setDescription("Avertir un membre")
        .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
        .addUserOption(options =>
            options.setName("membre")
            .setDescription("Le membre à avertir")
            .setRequired(true)
        )
        .addStringOption(options => 
            options.setName("raison")
            .setDescription("La raison pour laquelle tu l'avertis")
            .setRequired(false)
        ),
        async execute(interaction) {
            
            const user = interaction.options.getUser("membre");
            const reason = interaction.options.getString("raison") || "Aucune raison précisée";
            const member = interaction.guild.members.fetch(user.id);
            const channel = interaction.guild.channels.cache.get(channelLogs);
            const embed = new EmbedBuilder()
                .setTitle("Avertissement")
                .setDescription(`Le membre ${user} a reçu un avertissement. Raison: \`${reason}\` `)
                .setColor(0xF68A11)
                .setTimestamp()
            try {
            //if (member.roles.cache.has(roleBot)) {interaction.reply({content: "Tu ne peux pas me faire d'avertissement !", ephemeral: true}); return;};
            //if (member.roles.cache.has(roleAngi)) {interaction.reply({content: "Tu ne peux pas avertir Angi !", ephemeral: true}); return;};
            
            interaction.reply({embeds: [embed]});
            await channel.send({embeds: [embed]});
            } catch (error) {
                console.error(error)
            }
        }
}