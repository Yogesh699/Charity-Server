// connectDatabase.js
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log(`Connected to database: ${conn.connection.host}`);
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
  }
};

export default connectDatabase;
