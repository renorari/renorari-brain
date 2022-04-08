const brain = require("brain.js");
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
const ScrapedData = require("./scraped.json");
const trainingData = [];

ScrapedData.forEach((data) => {
    trainingData.push({
        "input": [
            data.channel,
            data.guild,
            data.time,
            data.ReferenceContent ? data.ReferenceContent : "",
            data.ReferenceAuther ? data.ReferenceAuther : ""
        ],
        "output": data.message
    });
});

const ai = new brain.recurrent.GRU({ hiddenLayers: [300, 300] });
const result = ai.train(trainingData, {
    log: (details) => {
        console.log(details);
        console.log(ai.run([
            "845316698961608774",
            "726260425200762991",
            new Date(),
            "こんにちは",
            "698395012219666432"
        ]));
    },
    errorThresh: 0.011,
});

fs.writeFileSync("ai.json", JSON.stringify(ai.toJSON()), "utf-8");
(function question() {
    readline.question("> ", (answer) => {
        console.log(ai.run([
            "845316698961608774",
            "726260425200762991",
            new Date(),
            answer,
            "698395012219666432"
        ]));
        question();
    });
})();
