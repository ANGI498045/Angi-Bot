const { REST, Routes } = require("discord.js");
const { clientId, guildId, token } = require("./json/config.json");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        if ("data" in command && "execute" in command) {
            commands.push(command.data.toJSON());
        } else {
            console.log(`La commande de ${filePath} ne marche pas.`)
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Charge ${commands.length} commandes...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Chargement des ${data.length} commandes réussi !`);
    } catch (error) {
        console.error(error);
    }
})();