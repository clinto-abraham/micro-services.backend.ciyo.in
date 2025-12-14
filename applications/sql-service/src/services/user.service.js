const { User } = require("../models");
const passwordUtil = require("../utils/password.util");

exports.createUser = async (data) => {
  const hashed = await passwordUtil.hash(data.password);

  return User.create({
    email: data.email,
    password: hashed
  });
};

exports.findByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

exports.updateStatus = async (userId, status) => {
  return User.update({ status }, { where: { id: userId } });
};
