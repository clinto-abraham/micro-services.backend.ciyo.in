"use strict";

require("dotenv").config();
const express = require("express");

console.log('CLINTO =>', process.env.CLINTO);

const app = express();
app.use(express.json());

const routes = require("./src/routes");
const errorHandler = require("./src/middlewares/error.middleware");

app.use(express.json());

app.use("/sql/users", routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`User service listening on ${PORT}`));



module.exports = app;