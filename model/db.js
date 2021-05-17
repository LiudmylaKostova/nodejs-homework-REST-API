const mongoose = require("mongoose");

require("dotenv").config();

const uriDb = process.env.URI_DB;

const db = mongoose.connect(uriDb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  poolSize: 5,
});

mongoose.connection.on("connected", () => {
  console.log("Database connection successful");
});

mongoose.connection.on("error", (error) => {
  console.log(`Database connection error: ${error.message}`);
  process.exit(1);
});

mongoose.connection.on("disconnected", () => {
  console.log("Database disconnected");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("Disconnect MongoDB");
    process.exit(1);
  });
});

module.exports = db;
