const mongoose = require("mongoose");

module.exports.connect = async (DATABASE_URL) => {
  try {
    if (!DATABASE_URL) {
      return console.log("Invalid DATABASE_URL");
    }

    // DATABASE OPTIONS
    const dbOptions = {
      dbName: process.env.DATABASE_NAME,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    let db = await mongoose.connect(DATABASE_URL, dbOptions);
    if (db) {
      console.log("Connected to database");
      return;
    }
  } catch (err) {
    console.log("Error:", err);
  }
};
