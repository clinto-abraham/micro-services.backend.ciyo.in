const providers = require("./llm");
const config = require("../config/ai.config");
const events = require("./event.service");

exports.process = async ({ prompt, userId }) => {
  const provider = providers[config.defaultProvider];
  const response = await provider.chat(prompt);

  await events.emit("AI_COMPLETED", {
    userId,
    response
  });

  return response;
};
