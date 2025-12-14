"use strict";

const paymentService = require("../../services/payment.service");
const notificationService = require("../../services/notification.service");
const logger = require("../../utils/logger");

module.exports = async () => {
  logger.info("🔍 Fetching pending payments");

  const pendingPayments = await paymentService.getPendingPayments();

  for (const payment of pendingPayments) {
    // EMAIL
    await notificationService.sendEmail({
      to: payment.email,
      template: "payment-reminder",
      payload: {
        amount: payment.amount,
        dueDate: payment.dueDate
      }
    });

    // Optional SMS
    if (payment.phone) {
      await notificationService.sendSMS({
        to: payment.phone,
        template: "payment-reminder",
        payload: {
          amount: payment.amount
        }
      });
    }

    logger.info(`📨 Reminder triggered for ${payment.email}`);
  }
};
