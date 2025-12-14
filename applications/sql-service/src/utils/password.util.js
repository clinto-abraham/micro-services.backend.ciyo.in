const bcrypt = require("bcrypt");

exports.hash = async (password) => {
  return bcrypt.hash(password, 12);
};

exports.compare = async (password, hash) => {
  return bcrypt.compare(password, hash);
};
