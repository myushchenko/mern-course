const mongoose = require("mongoose");
const express = require("express");
const config = require("config");
const path = require("path");

const PORT = config.get("port");
const MONGO_DB_URL = config.get("mongoUrl");
const CLIENT_BUILD_PATH = path.join(__dirname, "../../client/build");

const app = express();
app.use(express.json({ extended: true }));

// Apply middlewares
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t", require("./routes/redirect.routes"));

console.log("[Node][App.js] NODE_ENV: ", process.env.NODE_ENV);

// Run static files
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(CLIENT_BUILD_PATH));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(CLIENT_BUILD_PATH, "index.html"));
  });
}

async function start() {
  try {
    console.log("[Node][App.js] MONGO_DB_URL: ", MONGO_DB_URL);
    await mongoose.connect(MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    app.listen(PORT, () =>
      console.log(`[Node][App.js] App has been started on port ${PORT}`)
    );
  } catch (e) {
    console.log("[Node][App.js] Server MongoDB error: ", e.message);
    process.exit(1);
  }
}

start();
