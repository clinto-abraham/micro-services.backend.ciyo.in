const userService = require("../services/user.service");
const authService = require("../services/auth.service");
const response = require("../utils/response.util");

/**
 * Register User
 */
exports.register = async (req, res, next) => {
  try {
    const user = await userService.createUser(req.body);
    response.success(res, user, "User registered successfully");
  } catch (err) {
    next(err);
  }
};

/**
 * Login User
 */
exports.login = async (req, res, next) => {
  try {
    const data = await authService.login(req.body);
    response.success(res, data, "Login successful");
  } catch (err) {
    next(err);
  }
};

/**
 * Get Logged-in User Profile
 */
exports.profile = async (req, res, next) => {
  try {
    const userId = req.user.id; // injected by auth middleware
    const user = await userService.getUserById(userId);
    response.success(res, user);
  } catch (err) {
    next(err);
  }
};

/**
 * Update User Status (ACTIVE / BLOCKED / SUSPENDED)
 */
exports.updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const updatedUser = await userService.updateUserStatus(id, status);
    response.success(res, updatedUser, "User status updated");
  } catch (err) {
    next(err);
  }
};
