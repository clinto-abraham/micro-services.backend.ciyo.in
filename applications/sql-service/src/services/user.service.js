const { User } = require("../models");
const bcrypt = require("bcryptjs");
const ApiError = require("../utils/api-error.util");

exports.createUser = async (payload) => {
  const { email, password, firstName, lastName } = payload;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    status: "ACTIVE",
  });

  return sanitizeUser(user);
};

exports.getUserById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return sanitizeUser(user);
};

exports.updateUserStatus = async (userId, status) => {
  const user = await User.findByPk(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.status = status;
  await user.save();

  return sanitizeUser(user);
};

/**
 * Remove sensitive fields
 */
function sanitizeUser(user) {
  const data = user.toJSON();
  delete data.password;
  return data;
}
