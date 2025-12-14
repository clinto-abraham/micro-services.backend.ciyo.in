"use strict";

const axios = require("axios");

module.exports = async function localLLM(prompt) {
  try {
    const r = await axios.post(
      (process.env.LOCAL_LLM_URL || "http://localhost:11434") + "/api/generate",
      { model: "llama3", prompt },
      { timeout: 20000 }
    );
    return (r.data && (r.data.response || r.data.text || r.data.output)) ? (r.data.response || r.data.text || r.data.output) : "No response";
  } catch (err) {
    console.error("Local LLM error:", err.message);
    return "Local LLM unavailable";
  }
};
