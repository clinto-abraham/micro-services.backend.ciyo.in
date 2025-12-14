const router = require("express").Router();
const aiRoutes = require("./ai.routes");

router.use("/ai", aiRoutes);

module.exports = router;
