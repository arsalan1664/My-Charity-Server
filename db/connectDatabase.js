// connectDatabase.js
import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://mearsalan:mearsalan@cluster0.mimezxj.mongodb.net/Charity"
    );
    console.log(`Connected to database`);
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
  }
};

export default connectDatabase;
