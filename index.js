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

client.login(token)