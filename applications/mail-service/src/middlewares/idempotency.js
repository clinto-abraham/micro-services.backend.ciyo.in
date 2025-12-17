const seen = new Set();

module.exports = (req, res, next) => {
  const key = req.headers["x-idempotency-key"];
  if (key && seen.has(key)) {
    return res.json({ ok: true, duplicate: true });
  }
  if (key) seen.add(key);
  next();
};
