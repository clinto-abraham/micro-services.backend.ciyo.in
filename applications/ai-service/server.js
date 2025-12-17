"use strict";
require("./src/configs/env");

const PORT = process.env.PORT;

const app = require("./src/app");
require("./src/queues/ai.worker");

app.listen(PORT, () => {
  console.log(`🧠 AI-Service running on port ${PORT}`);
});
