"use strict";

const transporter = require("../config/mail.config");
const templateService = require("./template.service");

exports.sendTemplatedEmail = async ({ to, subject, template, data }) => {
  const html = templateService.render({ template, data });

  return transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html,
  });
};
