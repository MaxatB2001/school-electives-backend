const jwt = require("jsonwebtoken");

class TokenService {
  generateAccessToken(payload) {
    if (payload.exp) {
      delete payload.exp
      delete payload.iat
    }
    const accessToken = jwt.sign(payload, "secret", {
      expiresIn: "1d",
    });
    return accessToken;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, "secret")
      return userData
    } catch (error) {
      return null
    }
  }
}

module.exports = new TokenService();
