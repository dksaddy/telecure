import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
  appointment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },
  medication: [
    {
      name: { type: String, required: true },
      frequency: { type: String },
      instruction: { type: String },
      duration: { type: String },
    }
  ],
  complaints: [
    { type: String }
  ],
  investigation: [
    { type: String }
  ],
  diagnosis: [
    { type: String }
  ]
}, {
  timestamps: true
});

const Prescription = mongoose.models.Prescription || mongoose.model('Prescription', prescriptionSchema);

export default Prescription;
