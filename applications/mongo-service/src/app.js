const express = require("express");

const connectMongo = require("./configs/mongoose");
const logger = require("./configs/logger");
const routes = require("./routes");
const security = require("./middlewares/security");
const errorHandler = require("./middlewares/errorHandler");


const app = express();

// Middleware
app.use(express.json());
security(app);

// Database connection
connectMongo();

// Routes
app.use("/mongo", routes);

// Final error handler
app.use(errorHandler);

app.use("/mongo", routes);

app.get("/health", (_, res) =>
  res.json({ ok: true, service: "mongo-service" })
);

module.exports = app;
