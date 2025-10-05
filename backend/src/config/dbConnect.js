const mongoose = require("mongoose");

// Connect to MongoDB
const dbConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_CONNECT_URL);
    console.log(`MongoDB connected: ${connect.connection.name}`);
  } catch (err) {
    console.log("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};
module.exports = dbConnect;
