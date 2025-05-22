import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongodb';
import Appointment from '@/app/models/Appointment';

export async function POST(request) {
  await connectDB();
  const { doctorId, date, timeRange } = await request.json();
  console.log("Received data:", { doctorId, date, timeRange });
  

  if (!doctorId || !date || !timeRange) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const appointments = await Appointment.find({
      docId: doctorId,
      date,
      timeRange
    }).select("interval");

    const bookedIntervals = appointments.map((app) => app.interval);
    return NextResponse.json({ bookedIntervals });
  } catch (err) {
    return NextResponse.json(
      { error: "Error fetching appointments", details: err.message },
      { status: 500 }
    );
  }
}
