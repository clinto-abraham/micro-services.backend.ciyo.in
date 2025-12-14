const aiQueue = require("../queues/ai.queue");

exports.chat = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt required" });
    }

    const job = await aiQueue.add("chat", {
      prompt,
      userId: req.headers["x-user-id"]
    });

    res.json({
      success: true,
      jobId: job.id
    });
  } catch (err) {
    next(err);
  }
};
