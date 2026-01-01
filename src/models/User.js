import mongoose from "mongoose";


/*************** Define the schema Here ****************/
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "patient", 'doctor'],
      default: "patient"
    }
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);



/************** Create model from schema Here ****************/
const User = mongoose.models.User || mongoose.model("User", userSchema);



/************** module export from  here **************/
export default User;
