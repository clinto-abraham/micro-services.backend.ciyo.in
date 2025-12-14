const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json());

app.use("/api", routes);

app.get("/health", (_, res) =>
  res.json({ ok: true, service: "mail-service" })
);

module.exports = app;
