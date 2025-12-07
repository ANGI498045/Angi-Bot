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
const {database} = require("./loaders/database");

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

const eventsPath = path.join(__dirname, "events");
const eventsFile = fs.readdirSync(eventsPath)

for (const file of eventsFile) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (... args) => event.execute(... args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
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
});

//automod
client.on("messageCreate", async message => {
    if (message.content.includes("noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
    else if (message.content.includes("Noob")) {
        message.reply(`${message.author} Veille à ton vocabulaire.`)
    }
});

client.login(token)