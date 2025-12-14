module.exports = (req, res, next) => {
  if (req.headers["x-internal-token"] !== process.env.INTERNAL_API_TOKEN) {
    return res.status(403).json({ error: "Forbidden" });
  }
  next();
};
