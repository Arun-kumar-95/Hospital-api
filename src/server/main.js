const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./src/config/config.env" });

const port = process.env.PORT || 3000;
const dburl = process.env.DATABASE_URL || "mongodb://localhost:27017";

const { connect } = require("../config/config.db.js");

// DATABASE CONNECTION
connect(dburl);

app.listen(port, (err) => {
  if (err) {
    console.log("Error: " + err);
    return;
  }

  console.log("connected to " + port);
});

module.exports = app;
