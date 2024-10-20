const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require("discord.js");
const { roleAdmin, roleMod, roleModTest, roleAngi, roleBot, roleView, roleNDC } = require("../../json/role.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("perm")
        .setDescription("Te donne les permissions d'un membre")
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("Le membre dont tu souhaite vérifier les permissions")
            .setRequired(true)
        ),

    async execute(interaction) {
        const user = interaction.options.getUser("membre");
        const member = await interaction.guild.members.fetch(user.id);

        if (member.roles.cache.has(roleAngi)) {
            var Hrole = "Créateur";
        }
        else if (member.roles.cache.has(roleAdmin)) {
            var Hrole = "Administrateur";
        }
        else if (member.roles.cache.has(roleMod)) {
            var Hrole = "Modérateur";
        }
        else if (member.roles.cache.has(roleModTest)) {
            var Hrole = "Modérateur-Test";
        }
        else if (member.roles.cache.has(roleBot)) {
            var Hrole = "Bot";
        }
        else if (member.roles.cache.has(roleNDC)) {
            var Hrole = "Noix de COCO"
        }
        else if (member.roles.cache.has(roleView)) {
            var Hrole = "Membre";
        }

        const embed = new EmbedBuilder()
            .setTitle("Rôles")
            .setDescription(`Le rôle le plus élevé de ${member} est: \`${Hrole}\``)
            .setColor(0x0099ff)
            .setTimestamp()

        try {
            await interaction.reply({embeds: [embed]});
        } catch (error) {
            console.error(error)
        }
    }
}