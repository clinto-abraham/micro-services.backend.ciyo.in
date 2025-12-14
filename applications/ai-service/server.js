"use strict";

const { PORT } = require("./src/config/env");
const app = require("./src/app");
require("./src/queues/ai.worker");

app.listen(PORT, () => {
  console.log(`🧠 AI-Service running on port ${PORT}`);
});
