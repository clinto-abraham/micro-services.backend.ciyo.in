"use strict";

const router = require("express").Router();

router.use("/seats", require("./seat.routes"));
router.use("/bookings", require("./booking.routes"));
router.use("/health", require("./health.routes"));

module.exports = router;
