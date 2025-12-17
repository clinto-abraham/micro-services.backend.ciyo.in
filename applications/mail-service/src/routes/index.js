"use strict";

const router = require("express").Router();
const controller = require("../controllers/mail.controller");
const auth = require("../middlewares/auth.internal");

router.post("/send-mail", controller.send);
router.post("/preview/:template", controller.preview);

router.use(auth);


module.exports = router;

