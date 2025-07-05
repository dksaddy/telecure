import { NextResponse } from 'next/server';
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment"
import Prescription from "@/app/models/Prescription"
import Doctor from  "@/app/models/Doctor"

export async function POST(req) {
  await connectDB();
  const { callLink } = await req.json();

  try {
    const appointment = await Appointment.findOne({ callLink });
    if (!appointment) {
      return NextResponse.json({ error: 'Appointment not found' }, { status: 404 });
    }

    // Create prescription if not exists
    let prescription = await Prescription.findOne({ appointment_id: appointment._id });
    let isNew = false;

    if (!prescription) {
      prescription = await Prescription.create({
        appointment_id: appointment._id,
        medication: [],
        complaints: [],
        investigation: [],
        diagnosis: []
      });
      isNew = true;
    }

    // Fetch doctor details
    const doctor = await Doctor.findById(appointment.docId).select('firstName lastName specialization education');

    return NextResponse.json(
      {
        message: isNew ? 'Prescription created' : 'Prescription already exists',
        prescription,
        appointment,
        doctor: {
          name: `${doctor.firstName} ${doctor.lastName}`,
          specialization: doctor.specialization,
          education: doctor.education
        }
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
