const speakeasy = require("speakeasy");
const QRCode = require("qrcode");

exports.generateSecret = async () => {
  const secret = speakeasy.generateSecret({ length: 20 });
  const qr = await QRCode.toDataURL(secret.otpauth_url);

  return {
    base32: secret.base32,
    qr
  };
};

exports.verifyToken = (secret, token) => {
  return speakeasy.totp.verify({
    secret,
    encoding: "base32",
    token,
    window: 1
  });
};
