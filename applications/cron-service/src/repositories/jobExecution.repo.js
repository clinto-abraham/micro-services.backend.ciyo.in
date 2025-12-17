"use strict";
const { v4: uuid } = require("uuid");

const executions = new Map();

exports.start = (job) => {
  const id = uuid();
  executions.set(id, { job, status: "RUNNING", startedAt: Date.now() });
  return id;
};

exports.success = (id) => {
  executions.get(id).status = "SUCCESS";
};

exports.fail = (id, error) => {
  executions.get(id).status = "FAILED";
  executions.get(id).error = error.message;
};

exports.all = () => [...executions.values()];
