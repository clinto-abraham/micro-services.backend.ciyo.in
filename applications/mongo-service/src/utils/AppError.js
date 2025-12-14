"use strict";

function AppError(message, statusCode = 500) {
  const error = new Error(message);
  error.status = statusCode;
  error.isOperational = true;
  return error;
}

module.exports = AppError;
