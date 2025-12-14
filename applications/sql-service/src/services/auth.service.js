const userService = require("./user.service");
const passwordUtil = require("../utils/password.util");
const tokenUtil = require("../utils/token.util");

exports.login = async ({ email, password }) => {
  const user = await userService.findByEmail(email);
  if (!user) throw new Error("Invalid credentials");

  const isValid = await passwordUtil.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  if (user.status !== "ACTIVE")
    throw new Error("User not active");

  return {
    token: tokenUtil.signAccessToken({ userId: user.id }),
    twoFactorRequired: user.twoFactorEnabled
  };
};
