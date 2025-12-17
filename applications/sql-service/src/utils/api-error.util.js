"use strict";

/**
 * Factory function for API Errors
 */
const ApiError = (statusCode, message, meta = {}) => {
  const error = new Error(message);

  error.statusCode = statusCode;
  error.isOperational = true;
  error.meta = meta;

  Error.captureStackTrace(error, ApiError);
  return error;
};

/**
 * Common error shortcuts
 */
ApiError.badRequest = (msg = "Bad Request", meta) =>
  ApiError(400, msg, meta);

ApiError.unauthorized = (msg = "Unauthorized", meta) =>
  ApiError(401, msg, meta);

ApiError.forbidden = (msg = "Forbidden", meta) =>
  ApiError(403, msg, meta);

ApiError.notFound = (msg = "Resource not found", meta) =>
  ApiError(404, msg, meta);

ApiError.conflict = (msg = "Conflict", meta) =>
  ApiError(409, msg, meta);

ApiError.unprocessable = (msg = "Unprocessable Entity", meta) =>
  ApiError(422, msg, meta);

ApiError.internal = (msg = "Internal Server Error", meta) =>
  ApiError(500, msg, meta);

module.exports = ApiError;
