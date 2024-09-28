const {  SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, escapeHeading } = require("discord.js");
const {channelLogs} = require("../../config.json");

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
            const channel = interaction.guild.channels.cache.get(channelLogs)
            try {
                if (member.roles.cache.has("1273620377318326293")) {
                    interaction.reply({content: "Tu ne peux pas kick un modérateur !", ephemeral: true});
                    return;
                }
                if (member.roles.cache.has("1273620410226708603")) {
                    interaction.reply({content: "Tu ne peux pas kick un modérateur !", ephemeral: true});
                    return;
                }
                if (member.roles.cache.has("1209450064720957490")) {
                    interaction.reply({content: "Tu ne peux pas kick un modérateur !", ephemeral: true});
                    return;
                }
                if (member.roles.cache.has("1209449963071873044")) {
                    interaction.reply({content: "Tu ne peux pas kick Angi !", ephemeral: true});
                    return;
                }
                if (member.user.bot) {
                    interaction.reply({content: "Tu ne peux pas kick un Bot !", ephemeral: true});
                    return;
                }
                const member = await interaction.guild.members.fetch(user.id);
                await member.kick(reason);
                const embed = new EmbedBuilder()
                    .setTitle("Expulsion")
                    .setDescription(`Le membre ${user} a été expulsé. Raison: ${reason}.`)
                    .setColor(0xF68A11)
                    .setTimestamp()
                await channel.send({embeds: [embed]});
                await interaction.reply({content: `Membre ${user} expulsé: ${reason}.`, ephemeral: true});
            } catch (error) {
                console.error(error)
            }
        },
};