import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
  },
  specialization: {
    type: [String], // e.g., ["Cardiology", "Dermatology"]
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  experience: {
    type: Number, // years of experience
    required: true,
  },
  bio: {
    type: String,
    maxlength: 1000,
  },
  profileImage: {
    type: String, // URL to profile picture
  },
  certificates: [
    {
      name: String,
      url: String,
      issuedBy: String,
    },
  ],
  isVerified: {
    type: Boolean,
    default: false,
  },
  availableSlots: [
    {
      day: {
        type: String, // "Monday", "Tuesday", etc.
      },
      slots: [
        {
          start: String, // "10:00 AM"
          end: String, // "11:00 AM"
        },
      ],
    },
  ],
  ratings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient" },
      comment: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Doctor = mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);

export default Doctor;
