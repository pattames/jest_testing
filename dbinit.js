const mongoose = require("mongoose");

const connectDB = async () => {
  const dbUri =
    process.env.NODE_ENV === "test"
      ? process.env.MONGO_URI_TEST
      : process.env.MONGO_URI;
  const conn = await mongoose.connect(dbUri);
  console.log(`MongoDB connected: ${conn.connection.name}`.underline.cyan);
};

module.exports = connectDB;
