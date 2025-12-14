"use strict";

const seatService = require("../services/seat.service");
const response = require("../helpers/response");

exports.createSeat = async (req, res, next) => {
  try {
    const seat = await seatService.createSeat(req.body);
    return response.success(res, "Seat created successfully", seat);
  } catch (err) {
    next(err);
  }
};

exports.getSeats = async (req, res, next) => {
  try {
    const seats = await seatService.getSeats();
    return response.success(res, "All seats fetched", seats);
  } catch (err) {
    next(err);
  }
};
