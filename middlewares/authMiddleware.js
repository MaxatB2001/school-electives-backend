const ApiError = require("../exeptions/apiError.js");
const tokenService = require("../services/tokenService.js");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      next(ApiError.UnauthorizedError());
    }
    const accessToken = authHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.UnauthorizedError());
  }
}
