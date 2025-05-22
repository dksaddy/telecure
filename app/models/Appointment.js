import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ["male", "female", "other"], required: true },
  weight: { type: String, required: true },
  heightFeet: { type: String, required: true },
  heightInch: { type: String, required: true },

  // Simplified file structure
  files: [{
    name: String,
    url: String,
    size: Number,
  }],

  date: { type: String, required: true },
  interval: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  timeRange: { type: String, required: true },

  docId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
  paymentStatus: { type: Boolean, default: false },

  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction", default: null },

  callLink: { type: String, default: null }
}, {
  timestamps: true,
});

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
