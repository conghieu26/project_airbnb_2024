const mongoose = require("mongoose");

const uri =
  "mongodb+srv://Hieu:Hieu2612@airbnb.pxszq.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected!!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
