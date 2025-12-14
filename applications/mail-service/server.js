"use strict";

require("dotenv").config();

const app = require("./app");

app.listen(8500, () => {
  console.log("📨 Mail service running on 9000");
});
