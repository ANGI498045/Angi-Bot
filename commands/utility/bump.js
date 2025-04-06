const { EmbedBuilder } = require("@discordjs/builders");
const { SlashCommandBuilder } = require("discord.js");
const {channelBot} = require("../../json/channels.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("bump")
        .setDescription("Valide ton bump (tout abus sera punni)"),
    async execute(interaction) {
    const channel = interaction.guild.channels.cache.get(channelBot);
    const embed = new EmbedBuilder()
        .setTitle("Rappel de Bump")
        .addFields({name: "C'est l'heure du bump !", value: "Allez-y, bumpez !"})
        .setColor(0x0099ff)
    interaction.reply(`Merci pour ton bump ! Voici un point de bonus.`);
    const delay = (delayInms) => {
        return new Promise(resolve => setTimeout(resolve, delayInms));
      };
      
      const sample = async () => {
        let delayres = await delay(1000*60*150);
        channel.send({embeds: [embed]});
      };
      sample();
}
};
