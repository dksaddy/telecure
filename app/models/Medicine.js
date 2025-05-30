import mongoose from 'mongoose';

const medicineSchema = new mongoose.Schema({
  brandId: Number,
  brandName: String,
  type: String,
  slug: String,
  dosageForm: String,
  generic: String,
  strength: String,
  manufacturer: String,
  packageContainer: String,
  packageSize: String,
});

export default mongoose.models.Medicine || mongoose.model('Medicine', medicineSchema);
