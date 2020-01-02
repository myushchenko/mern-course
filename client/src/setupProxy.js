const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  let target = "http://localhost:5000";

  if (process.env.REACT_ENV === "docker") {
    target = "http://server:4000";
  }

  app.use("/api", proxy({ target, changeOrigin: true }));
};
