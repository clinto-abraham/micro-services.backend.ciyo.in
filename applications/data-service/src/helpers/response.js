"use strict";

module.exports = {
  success(res, message = "Success", data = null, code = 200) {
    return res.status(code).json({
      success: true,
      message,
      data
    });
  },

  error(res, message = "Something went wrong", code = 500, error = null) {
    return res.status(code).json({
      success: false,
      message,
      error
    });
  }
};
