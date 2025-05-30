import { connectDB } from '@/app/lib/mongodb';
import Medicine from '@/app/models/Medicine';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    const { id } = await req.json();

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: 'Invalid medicine ID' }, { status: 400 });
    }

    await connectDB();

    const medicine = await Medicine.findById(id);

    if (!medicine) {
      return Response.json({ message: 'Medicine not found' }, { status: 404 });
    }

    return Response.json(medicine);
  } catch (error) {
    console.error('Details fetch error:', error);
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
