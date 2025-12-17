"use strict";

const mailQueue = require("../queues/mail.queue");
const templateService = require("../services/template.service");

exports.send = async (req, res) => {
  await mailQueue.add("send-email", req.body);
  res.json({ ok: true, queued: true });
};

exports.preview = (req, res) => {
  const { template } = req.params;
  const data = req.body || {};

  const html = templateService.render({ template, data });
  res.send(html);
};
