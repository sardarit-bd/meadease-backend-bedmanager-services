import mongoose from "mongoose";


/*********** Database connection Here **********/
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.AUTH_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed", error);
    process.exit(1);
  }
};


/********** Modules export from here *********/
export default connectDB;
