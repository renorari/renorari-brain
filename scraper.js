const { Client, GatewayIntentBits } = require("discord.js");
const { readFile, writeFile } = require("node:fs/promises");
require("dotenv").config();
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages] });

client.on("ready", () => {
    console.log(`${client.user.tag}としてログインしました`);
    client.user.setActivity("取得中...", { type: "PLAYING" });
});

client.on("messageCreate", async (message) => {
    if (message.author.id != "698395012219666432") return;
    if (!message.content && message.content == "") return;
    if (message.reference?.messageId) {
        const reference = await message.fetchReference();
        const messages = JSON.parse(await readFile("./messages.json", "utf-8"));
        messages.push({
            "reference": reference.content,
            "message": message.content
        });
        await writeFile("./messages.json", JSON.stringify(messages), "utf-8");
    } else {
        const secondToLastMessage = (await message.channel.messages.fetch()).first(2)[1];
        const messages = JSON.parse(await readFile("./messages.json", "utf-8"));
        messages.push({
            "reference": secondToLastMessage.content,
            "message": message.content
        });
        await writeFile("./messages.json", JSON.stringify(messages), "utf-8");
    }
});

client.login(process.env.DISCORD_TOKEN);
