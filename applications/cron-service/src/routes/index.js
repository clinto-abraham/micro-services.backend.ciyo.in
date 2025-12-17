"use strict";

const router = require("express").Router();
const { cronQueue } = require("../queues/cron.queue");

router.get("/health", async (req, res) => {
  res.json({
    ok: true,
    service: "cron-service",
    timestamp: new Date().toISOString()
  });
});

router.post("/run/:job", async (req, res) => {
  await cronQueue.add("manual", { job: req.params.job });
  res.json({ ok: true });
});

module.exports = router;

