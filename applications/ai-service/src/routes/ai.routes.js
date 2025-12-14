const router = require("express").Router();
const controller = require("../controllers/ai.controller");
const auth = require("../middlewares/auth.middleware");
const rateLimit = require("../middlewares/rateLimit.middleware");

router.post("/chat", auth, rateLimit, controller.chat);

module.exports = router;
