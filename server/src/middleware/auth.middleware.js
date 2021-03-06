const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  // Check if server accessible
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: "No Authorization" });
    }

    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (e) {
    console.log("[Node][auth.middleware] error: ", e);
    res.status(401).json({ message: "No Authorization" });
  }
};
