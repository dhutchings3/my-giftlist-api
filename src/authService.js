const jwt = require("jsonwebtoken");
const config = require("./config");

const AuthService = {
  parseBasicToken(token) {
    return Buffer.from(token, "base64")
      .toString()
      .split(":");
  },
  createJwt(subject, payload) {
    return jwt.sign(payload, config.JWT_SECRET, {
      subject: subject,
      algorithm: "HS256"
    });
  }
};

module.exports = {
  AuthService
};