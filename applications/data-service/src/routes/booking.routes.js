"use strict";

const router = require("express").Router();
const controller = require("../controllers/booking.controller");
const validate = require("../middlewares/validators");
const { bookingValidator } = require("../validators/booking.validator");

router.post("/", validate(bookingValidator), controller.createBooking);
router.get("/", controller.getAllBookings);
router.get("/:id", controller.getBookingById);
router.delete("/:id", controller.deleteBooking);

module.exports = router;
