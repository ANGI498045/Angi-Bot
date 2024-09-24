const { Client, GatewayIntentBits, Events, ActivityType, Collection } = require("discord.js");
const { token, channelLogs } = require("./config.json");
const { EmbedBuilder } = require("@discordjs/builders"); 
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const path = require("node:path");
const fs = require("node:fs");

client.on(Events.ClientReady, async readyClient => {
    console.log(`Bot ${readyClient.user.tag} online`);
    client.user.setActivity("le live d'Angi49_", {type: ActivityType.Watching});
});

client.on(Events.GuildMemberAdd, async (member) => {
    const embed = new EmbedBuilder()
        .addFields({name: "Nouveau Membre", value: `${member.user} a rejoint le serveur ! Bienvenue !`})
        .setColor(0x0099ff)
        .setTimestamp()
    const channel = client.channels.cache.get("1209468207295897711");
    const channelL = client.channels.cache.get(channelLogs);
    const roleView = "1209450123189559307";
    const roleBot = "1273621232759341057";
    if (!member.user.bot) {
        member.roles.add(roleView);
    if (!member.user.tag === "testangi498045") {
        channel.send({ embeds: [embed] }); 
    }
        }
    if (member.user.bot) member.roles.add(roleBot);
});

client.on(Events.GuildMemberRemove, async (member) => {
    const embed = new EmbedBuilder()
        .addFields({name: "Départ", value:`${member.user.tag} a quitté le serveur...`})
        .setColor(0x0099ff)
        .setTimestamp()
    const channel = client.channels.cache.get("1209468207295897711");
    if (!member.user.bot) {
    if (!member.user.tag === "testangi498045") {
        channel.send({ embeds: [embed] });
    }
}
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
    if (!command) {
        console.error({content: `La commande ${interaction.commandName} n'existe pas.`, ephemeral: true});
        return;
    }

    try {
        await command.execute(interaction);
        const embedC = new EmbedBuilder()
            .setTitle("Commande")
            .setDescription(`La commande \`${interaction.commandName}\` a été utilisée.`)
            .setColor(0x0099ff)
            .setTimestamp();
        const channel = client.channels.cache.get(channelLogs);
        channel.send({embeds: [embedC]});
        console.log(interaction.commandName)
    } catch (error) {
        console.error(error);
        interaction.reply({content: "Erreur avec la commande.", ephemeral: true});
        const embedErr = new EmbedBuilder()
                .setTitle("Erreur")
                .setDescription(`Erreur avec la commande \`${interaction.commandName}\`.`)
                .setTimestamp()
                .setColor(0xC11919);
        const channel = client.channels.cache.get(channelLogs);
        channel.send({embeds: [embedErr]});
    }
});

client.login(token)