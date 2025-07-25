import { connectDB } from '@/app/lib/mongodb';
import Appointment from '@/app/models/Appointment'; // Adjust path if needed

export async function POST(req) {
  await connectDB();
  const { callLink } = await req.json();

  if (!callLink) {
    return Response.json({ success: false, message: 'Missing callLink' }, { status: 400 });
  }

  const updated = await Appointment.findOneAndUpdate(
    { callLink },
    { status: 'completed' },
    { new: true }
  );

  if (!updated) {
    return Response.json({ success: false, message: 'Appointment not found' }, { status: 404 });
  }

  return Response.json({ success: true, appointment: updated });
}
