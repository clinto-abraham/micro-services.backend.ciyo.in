module.exports = function errorMiddleware(err, req, res, next) {
  console.error("❌ Error:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Sequelize validation error
  if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.errors.map(e => e.message).join(", ");
  }

  // Sequelize unique constraint error
  if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 409;
    message = "Resource already exists";
  }

  // JWT errors
  if (
    err.name === "JsonWebTokenError" ||
    err.name === "TokenExpiredError"
  ) {
    statusCode = 401;
    message = "Authentication failed";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack
    })
  });
};
