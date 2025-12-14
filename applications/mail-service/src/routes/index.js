const router = require("express").Router();
const controller = require("../controllers/mail.controller");

router.post("/send", controller.send);
router.post("/preview/:template", controller.preview);

module.exports = router;



const auth = require("../middlewares/auth.internal");

router.use(auth);
router.use("/mail", require("./mail.routes"));

