const mongoose = require("mongoose");
const User = require("../models/user");
const MONGODB_URL = process.env.MONGODB_URL;

module.exports = function () {
  mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });

  mongoose.connection.on("connected", () => {
    console.log("Connect to MongoDB");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Error ${err}`);
  });
};
