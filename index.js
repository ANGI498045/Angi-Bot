const { Client, GatewayIntentBits, Events, ActivityType, Collection } = require("discord.js");
const { token } = require("./json/config.json");
const { roleView, roleBot, roleCS, roleMC, roleVal, roleFtn, roleGTA } = require("./json/role.json");
const { channelPlane, channelLogs, channelGen } = require("./json/channels.json")
const { EmbedBuilder } = require("@discordjs/builders");
const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const path = require("node:path");
const fs = require("node:fs");

client.on(Events.ClientReady, async readyClient => {
    console.log(`Bot ${readyClient.user.tag} online`)
    client.user.setActivity({type: ActivityType.Custom, name: "status", state: "Veille sur les membres de la Galette"});
});

client.on(Events.GuildMemberAdd, async (member) => {
    const embed = new EmbedBuilder()
        .addFields({name: "Nouveau Membre", value: `${member.user} a rejoint le serveur ! Bienvenue !`})
        .setColor(0x0099ff)
        .setTimestamp()
    if (!member.user.bot) {
        member.roles.add(roleView);
        if (member.user.id === "994167928989696020") return;
        const channel = client.channels.cache.get(channelPlane);
        channel.send({embeds: [embed]});
        const channel2 = client.channels.cache.get(channelGen);
        channel2.send(`Bienvenue ${member} !`);
    }
    if (member.user.bot) member.roles.add(roleBot);
    console.log("member +")
});

client.on(Events.GuildMemberRemove, async (member) => {
    const embed = new EmbedBuilder()
        .addFields({name: "Départ", value:`${member.user.tag} a quitté le serveur...`})
        .setColor(0x0099ff)
        .setTimestamp()
    const channel = client.channels.cache.get(channelPlane);
    if (member.user.bot) return;
    channel.send({ embeds: [embed] });
    console.log("member -")
});

client.commands = new Collection();

const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`La commande ne marche pas à ${filePath}.;`)
        }
    }
}

client.on(Events.InteractionCreate, async interaction => {
    if(!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);
    const channel = client.channels.cache.get(channelLogs);
    if (!command) {
        console.error({content: `La commande ${interaction.commandName} n'existe pas.`, ephemeral: true});
        return;
    }
    console.log(interaction.commandName)

    try {
        await command.execute(interaction);
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
            .setDescription(`La commande \`${interaction.commandName}\` a été utilisée.`)
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
});

//réaction + (roleréaction)
client.on("messageReactionAdd", async (reaction, user, message) => {
    if (reaction.emoji.name === "gta") reaction.message.guild.members.cache.get(user.id).roles.add(roleGTA);
    if (reaction.emoji.name === "cs2") reaction.message.guild.members.cache.get(user.id).roles.add(roleCS);
    if (reaction.emoji.name === "ftn") reaction.message.guild.members.cache.get(user.id).roles.add(roleFtn);
    if (reaction.emoji.name === "mc") reaction.message.guild.members.cache.get(user.id).roles.add(roleMC);
    if (reaction.emoji.name === "valorant") reaction.message.guild.members.cache.get(user.id).roles.add(roleVal);
});

//automod
client.on("messageCreate", async message => {
    if (message.content.includes("noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes("Noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.author.id === "1295084337863065655") {
        message.react("🦧");
        console.log("ok");
    }
})

client.login(token)