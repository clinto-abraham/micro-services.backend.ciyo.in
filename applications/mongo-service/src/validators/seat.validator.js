"use strict";

const Joi = require("joi");

exports.createSeatValidator = Joi.object({
  seatNumber: Joi.string().required(),
  row: Joi.string().required(),
  price: Joi.number().min(1).required(),
  status: Joi.string().valid("available", "reserved", "blocked")
});
