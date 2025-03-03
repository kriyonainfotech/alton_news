const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://khushbuzalavadiya8:khushbuzalavadiya8@cluster0.1behi.mongodb.net/Altonnews`
    );
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    return false;
  }
};
module.exports = connectDB;
