const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { roleAdmin, roleMod, roleModTest, roleAngi, roleBot, roleView } = require("../../role.json")

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
            return;
        }
        if (member.roles.cache.has(roleAdmin)) {
            var Hrole = "Administrateur";
            return;
        }
        if (member.roles.cache.has(roleMod)) {
            var Hrole = "Modérateur";
            return;
        }
        if (member.roles.cache.has(roleModTest)) {
            var Hrole = "Modérateur-Test";
            return;
        }
        if (member.roles.cache.has(roleBot)) {
            var Hrole = "Bot";
            return;
        }
        if (member.roles.cache.has(roleView)) {
            var Hrole = "Membre";
        }

        const embed = new EmbedBuilder()
            .setTitle("Roles")
            .addFields({title: member, value: `Le plus haut rôle du membre est: \`${Hrole}\`.`})
            .setColor(0x0099ff)
            .setTimestamp()

        try {
            await interaction.reply({embeds: [embed]})
        } catch (error) {
            console.error(error)
            await interaction.reply({content: "Erreur en affichant le rôle du membre", ephemeral: true});
        }
    }
}