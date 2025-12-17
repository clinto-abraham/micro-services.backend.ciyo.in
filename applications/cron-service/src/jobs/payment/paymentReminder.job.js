const paymentService = require("../../services/payment.service");
const mailService = require("../../services/mail.service");

module.exports = async () => {
  const overdueUsers = await paymentService.getOverdueUsers();

  for (const user of overdueUsers) {
    await mailService.send({
      to: user.email,
      template: "PAYMENT_REMINDER",
      data: user
    });
  }
};
