const express = require("express");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");

const userController = require("../controllers/user.controller");
const userValidation = require("../validations/user.validation");

const router = express.Router();

/**
 * ---------------------------
 * Health Check (LB / Gateway)
 * ---------------------------
 */
router.get("/health", (req, res) => {
  return res.status(200).json({
    status: "UP",
    service: "user-service",
    timestamp: new Date().toISOString()
  });
});

/**
 * ---------------------------
 * User Auth Routes
 * ---------------------------
 */
router.post(
  "/users/register",
  validate(userValidation.register),
  userController.register
);

router.post(
  "/users/login",
  validate(userValidation.login),
  userController.login
);

/**
 * ---------------------------
 * Protected User Routes
 * ---------------------------
 */
router.get(
  "/users/me",
  auth,
  userController.profile
);

router.patch(
  "/users/:id/status",
  auth,
  userController.updateStatus
);

module.exports = router;
