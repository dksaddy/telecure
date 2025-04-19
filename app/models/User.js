// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  email: { type: String, required: true, unique: true },
  profileImage: { type: String, default: "dp/default.jpg" },
  password: { type: String, required: true },
  role: { type: String, enum: ["doctor", "patient"], default: "patient" },
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite on hot reload
export default mongoose.models.User || mongoose.model("User", userSchema);
