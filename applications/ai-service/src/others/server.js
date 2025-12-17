// "use strict";

// require("dotenv").config();
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const { createPubSub } = require("../pubsub");
// const chatGPT = require("../chatgpt");
// const localLLM = require("../localLLM");

// const app = express();
// app.use(express.json());

// const PORT = parseInt(process.env.PORT || "9000", 10);
// const SERVICE_JWT_SECRET = process.env.SERVICE_JWT_SECRET || "service_secret_example";
// const REDIS_URL = process.env.REDIS_URL || "redis://:redisIsStartedOnDec15Of2025@127.0.0.1:6379";

// const { pub, sub } = createPubSub(REDIS_URL);

// // example async flow using redis pubsub
// sub.subscribe("ai:request", (err) => {});
// sub.on("message", async (channel, message) => {
//   try {
//     const data = JSON.parse(message);
//     const reply = data.mode === "local" ? await localLLM(data.text) : await chatGPT(data.text);
//     await pub.publish("ai:response", JSON.stringify({ requestId: data.requestId, reply }));
//   } catch (e) {
//     console.error("ai sub error:", e.message);
//   }
// });

// app.get("/health", (req, res) => res.json({ ok: true, service: "ai-service" }));

// // sync endpoint for gateway
// app.post("/ai", async (req, res) => {
//   const token = req.headers["x-internal-token"];
//   try { jwt.verify(token, SERVICE_JWT_SECRET); } catch (e) { return res.status(403).json({ error: "Invalid internal token" }); }
//   const { text, mode } = req.body;
//   try {
//     const reply = mode === "local" ? await localLLM(text) : (process.env.OPENAI_API_KEY ? await chatGPT(text) : await localLLM(text));
//     res.json({ reply });
//   } catch (e) {
//     res.status(500).json({ error: e.message });
//   }
// });

// app.listen(PORT, () => console.log(`AI service running on ${PORT}`));
