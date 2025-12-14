const axios = require("axios");
const { OPENAI_API_KEY } = require("../../config/env");

exports.chat = async prompt => {
  // MOCK SAFE (replace later with real call)
  return {
    model: "gpt-mock",
    output: `AI response for: ${prompt}`
  };

  // REAL CALL (when ready)
  /*
  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    },
    {
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`
      }
    }
  );

  return res.data;
  */
};
