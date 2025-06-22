import mongoose from "mongoose";
import dotenv from "dotenv";  

dotenv.config();  // Load .env variables

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("✅ Connected to database!");
    })
    .catch((err) => {
      console.log("❌ Some error occurred while connecting to the database:", err);
    });
};
