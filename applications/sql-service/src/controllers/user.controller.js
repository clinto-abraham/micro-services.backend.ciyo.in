const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const response = require("../utils/response.util");

exports.register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    response.success(res, user);
  } catch (e) {
    next(e);
  }
};

exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    response.success(res, data);
  } catch (e) {
    next(e);
  }
};
