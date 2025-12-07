const { Events } = require("discord.js");
const {roleGTA, roleCS, roleFtn, roleMC, roleVal} = require("../json/role.json")

module.exports = {
    name: Events.MessageReactionAdd,
    once: true,
    execute(client) {
    if (reaction.emoji.name === "gta") reaction.message.guild.members.cache.get(user.id).roles.add(roleGTA);
    if (reaction.emoji.name === "cs2") reaction.message.guild.members.cache.get(user.id).roles.add(roleCS);
    if (reaction.emoji.name === "ftn") reaction.message.guild.members.cache.get(user.id).roles.add(roleFtn);
    if (reaction.emoji.name === "mc") reaction.message.guild.members.cache.get(user.id).roles.add(roleMC);
    if (reaction.emoji.name === "valorant") reaction.message.guild.members.cache.get(user.id).roles.add(roleVal);
    }
}