"use strict";

const express = require("express");
const setupSwagger = require("./docs/swagger");

const spikeProtector = require("./security/spikeProtector");
const rateLimiter = require("./security/rateLimiter");
const aiTrafficGuard = require("./security/aiTrafficGuard");

const authMiddleware = require("./middlewares/auth.middleware");
const loggerMiddleware = require("./middlewares/logger.middleware");
const healthMiddleware = require("./middlewares/health.middleware");

const notFoundMiddleware = require("./middlewares/notfound.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const routes = require("./routes");


const app = express();

app.use(express.json());

app.use(spikeProtector);
app.use(rateLimiter);
app.use(rateLimiter);
app.use(aiTrafficGuard);

app.use(loggerMiddleware);
app.use(authMiddleware);
app.use(healthMiddleware);

setupSwagger(app);

app.use("/", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;

