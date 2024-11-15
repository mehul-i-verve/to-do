require("dotenv").config();
const jwt = require("jsonwebtoken");
const keys = require("../config/config");

module.exports = middlewares = {
  authenticateToken: async (req, res, next) => {
    try {
      if (
        !req.headers["authorization"] ||
        req.headers["authorization"] === ""
      ) {
        return res.failed(401, "Key Authorization not found");
      }

      const token = req.headers["authorization"].replace("Bearer ", "");

      const data = jwt.verify(token, keys.JWToken);
      if (!data) return res.failed(401, "Invalid token");
      req.user = data.id;

      next();
    } catch (error) {
      return res.failed(500, "Internal server error", error);
    }
  },
};
