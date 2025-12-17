#!/usr/bin/env node
"use strict";

const { execSync } = require("child_process");

const PORT = 5000 || process.env.PORT;
const MAX_RETRIES = 100;   // 👈 increased to 100
const SLEEP_MS = 300;     // 👈 optional: slightly faster loop

if (!PORT) {
  console.log("ℹ️ PORT not defined. Skipping free-port check.");
  process.exit(0);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function freePortLoop() {
  console.log(`🔍 Checking port ${PORT} availability...`);

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const pids = execSync(`lsof -ti :${PORT}`, { stdio: "pipe" })
        .toString()
        .trim();

      if (!pids) {
        console.log(`✅ Port ${PORT} is free`);
        process.exit(0);
      }

      console.log(
        `⚠️ Attempt ${attempt}/${MAX_RETRIES}: Port ${PORT} in use. Killing PIDs: ${pids}`
      );

      execSync(`kill -9 ${pids}`);
      await sleep(SLEEP_MS);

    } catch (err) {
      // lsof exits non-zero when no PIDs are found
      console.log(`✅ Port ${PORT} is free`);
      process.exit(0);
    }
  }

  console.error(
    `❌ Failed to free port ${PORT} after ${MAX_RETRIES} attempts`
  );
  process.exit(1);
}

freePortLoop();
