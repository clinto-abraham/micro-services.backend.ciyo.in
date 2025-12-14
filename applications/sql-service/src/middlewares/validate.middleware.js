module.exports = function validate(schema, property = "body") {
  return (req, res, next) => {
    try {
      const { error, value } = schema.validate(req[property], {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.details.map(d => d.message)
        });
      }

      req[property] = value;
      next();
    } catch (err) {
      next(err);
    }
  };
};
