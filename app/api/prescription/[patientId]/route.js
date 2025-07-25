import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import Prescription from "@/app/models/Prescription";
import User from "@/app/models/User";

export async function GET(req, { params }) {
  const { patientId } = await params;

  try {
    await connectDB();

    // Step 1: Find all appointments for the patient
    const appointments = await Appointment.find({ patientId });

    if (!appointments || appointments.length === 0) {
      return NextResponse.json([], { status: 200 });
    }

    // Step 2: Extract appointment IDs
    const appointmentIds = appointments.map((appt) => appt._id);

    // Step 3: Find prescriptions linked to these appointment IDs
    const prescriptions = await Prescription.find({
      appointment_id: { $in: appointmentIds },
    }).sort({ createdAt: -1 });

    return NextResponse.json(prescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions by patient:", error);
    return NextResponse.json(
      { message: "Failed to fetch prescriptions" },
      { status: 500 }
    );
  }
}
