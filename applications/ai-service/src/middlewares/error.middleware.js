module.exports = (err, req, res, _) => {
  console.error(err);
  res.status(500).json({ error: "Internal AI error" });
};
