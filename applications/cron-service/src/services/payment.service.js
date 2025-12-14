"use strict";

const axios = require("../utils/axios");

module.exports = {
  async getPendingPayments() {
    const { data } = await axios.get(
      `${process.env.PAYMENT_SERVICE_URL}/internal/pending-payments`
    );

    return data.payments;
  }
};
