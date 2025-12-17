

app.post("/pay", (req, res) => {
  const token = req.headers["x-internal-token"];
  try { jwt.verify(token, SERVICE_JWT_SECRET); } catch { return res.status(403).json({ error: "Invalid internal token" }); }

  const { amount, currency } = req.body;
  if (!amount) return res.status(400).json({ error: "amount required" });

  // create order using razorpay client (stubbed if keys not set)
  if (!process.env.RAZORPAY_KEY) {
    return res.json({ order: { id: `fake_${Date.now()}`, amount, currency: currency || "INR" } });
  }

  const rz = createClient();
  rz.orders.create({ amount: Math.round(amount * 100), currency: currency || "INR", payment_capture: 1 })
    .then(order => res.json({ order }))
    .catch(err => res.status(500).json({ error: err.message }));
});

// webhook endpoint (verify signature)
app.post("/webhook", (req, res) => {
  const signature = req.headers["x-razorpay-signature"];
  const secret = process.env.RAZORPAY_SECRET || "";
  const valid = secret ? require("./verifyWebhook").verify(req.rawBody, signature, secret) : true;
  if (!valid) return res.status(400).json({ error: "Invalid signature" });
  // process webhook
  res.json({ ok: true });
});