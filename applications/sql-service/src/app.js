"use strict";

const express = require("express");

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const { pingDB } = require("./configs/sequelize");
const dbRevival = require("./middlewares/db-activity.middleware");
const app = express();

pingDB();
/* ------------------ Global Middleware ------------------ */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(dbRevival);
/* ------------------ Routes ------------------ */
app.use("/sql", routes);

/* ------------------ Health Check ------------------ */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", service: "sql-service" });
});

/* ------------------ Error Handler ------------------ */
app.use(errorHandler);

module.exports = app;







