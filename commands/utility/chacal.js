const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chacal")
        .setDescription("chacalise une personne")
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("le membre à chacaliser")
            .setRequired(true)
        ),
        async execute(interaction) {
            const user = interaction.options.getUser("membre");
            const member = await interaction.guild.members.fetch(user.id);
            interaction.reply(`${member.user} a bien été chacalisé !`)
        }
}