"use strict";

exports.health = async (req, res) => {
  res.json({
    service: "sql-service",
    status: "ok",
    timestamp: new Date()
  });
};
