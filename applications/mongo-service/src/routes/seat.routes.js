"use strict";

const router = require("express").Router();
const seatController = require("../controllers/seat.controller");
const validate = require("../middlewares/validators");
const { createSeatValidator } = require("../validators/seat.validator");

router.post("/", validate(createSeatValidator), seatController.createSeat);
router.get("/", seatController.getSeats);

module.exports = router;

