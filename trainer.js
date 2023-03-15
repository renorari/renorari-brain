const { writeFileSync } = require("node:fs");
const brain = require("brain.js");
const messages = require("./messages.json");
const ai = new brain.recurrent.GRU({
    "hiddenLayers": [100,50]
});
const trainingData = messages.map(message => ({
    "input": message.reference,
    "output": message.message
}));
ai.train(trainingData, {
    log: details => console.log(details),
    errorThresh: 0.012
});
writeFileSync("./ai.json", JSON.stringify(ai.toJSON()), "utf-8");