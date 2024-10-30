const { Client, GatewayIntentBits, Events, ActivityType, Collection } = require("discord.js");
const { token } = require("./json/config.json");
const { roleView, roleBot } = require("./json/role.json");
const { channelPlane, channelLogs } = require("./json/channels.json")
const { EmbedBuilder } = require("@discordjs/builders");
const client = new Client({ intents:
    [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
});
const path = require("node:path");
const fs = require("node:fs");

client.on(Events.ClientReady, async readyClient => {
    console.log(`Bot ${readyClient.user.tag} online`)
    client.user.setActivity("les membres de la Galette", {type: ActivityType.Watching});
});

client.on(Events.GuildMemberAdd, async (member) => {
    const embed = new EmbedBuilder()
        .addFields({name: "Nouveau Membre", value: `${member.user.tag} a rejoint le serveur ! Bienvenue !`})
        .setColor(0x0099ff)
        .setTimestamp()
    if (!member.user.bot) {
        member.roles.add(roleView);
        if (member.user.id === "994167928989696020") {return;}
        const channel = client.channels.cache.get(channelPlane);
        channel.send({ embeds: [embed] }); 
    }
    if (member.user.bot) member.roles.add(roleBot);
});

client.on(Events.GuildMemberRemove, async (member) => {
    const embed = new EmbedBuilder()
        .addFields({name: "Départ", value:`${member.user.tag} a quitté le serveur...`})
        .setColor(0x0099ff)
        .setTimestamp()
    const channel = client.channels.cache.get(channelPlane);
    channel.send({ embeds: [embed] });
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

client.login(token)