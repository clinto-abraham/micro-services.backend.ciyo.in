"use strict";

const axios = require("../utils/axios");

const MAIL_SERVICE_URL = process.env.MAIL_SERVICE_URL || "http://localhost:8500";

module.exports = {
  async sendEmail({ to, template, payload }) {
    return axios.post(`${MAIL_SERVICE_URL}/internal/notify`, {
      type: "EMAIL",
      to,
      template,
      payload
    });
  },

  async sendSMS({ to, template, payload }) {
    return axios.post(`${MAIL_SERVICE_URL}/internal/notify`, {
      type: "SMS",
      to,
      template,
      payload
    });
  }
};
