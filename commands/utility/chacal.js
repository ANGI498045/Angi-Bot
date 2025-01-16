const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("chacal")
        .setDescription("chacalise une personne")
        .addUserOption(option =>
            option.setName("membre")
            .setDescription("le membre à chacaliser")
        ),
        async execute(interaction) {
            const user = interaction.options.cache.getUser("membre");
            const member = await interaction.guild.members.fetch(user.id);
            await interaction.reply(`Le membre ${member.user} a bien été chacalisé !`)
        }
}