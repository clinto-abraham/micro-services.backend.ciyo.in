"use strict";

const axios = require("axios");
require("dotenv").config();

module.exports = async function chatGPT(prompt) {
  if (!process.env.OPENAI_API_KEY) throw new Error("OPENAI_API_KEY not set");
  const resp = await axios.post("https://api.openai.com/v1/chat/completions", {
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    max_tokens: 400
  }, {
    headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
    timeout: 20000
  });
  return resp.data.choices?.[0]?.message?.content || "";
};
