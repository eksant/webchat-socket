// backend/src/utils/database.ts
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI!!, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
