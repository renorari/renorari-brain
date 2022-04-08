const { Client, Intents } = require("discord.js");
const { readFileSync, writeFileSync } = require("fs");
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES],
});

var database = [];
database = require("./scraped.json");

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity({"name": "学習中... | Training..."});
});

client.on("messageCreate", async (message) => {
    if (message.author.id != "698395012219666432") return;
    let data = {
        "message": message.cleanContent,
        "channel": message.channelId,
        "guild": message.guildId,
        "time": message.createdAt,
        "IsReference": message.reference ? true : false,
        "ReferenceContent": message.reference ? (await message.fetchReference()).cleanContent : null,
        "ReferenceAuther": message.reference ? (await message.fetchReference()).author.id : null
    };
    database.push(data);
    writeFileSync("scraped.json", JSON.stringify(database), "utf-8");
    console.log(data);
});

client.login(readFileSync("DiscordBotToken.txt","utf-8"));
