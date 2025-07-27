import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import User from "@/app/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { docId } = await params;

    // Find appointments for the doctor, sorted by last updated time
    const recentAppointments = await Appointment.find({ docId })
      .populate("patientId", "firstName lastName profileImage dateOfBirth")
      .sort({ updatedAt: -1 });

    const uniquePatientsMap = new Map();

    for (const appt of recentAppointments) {
      const patient = appt.patientId;
      const pid = patient?._id?.toString();

      if (pid && !uniquePatientsMap.has(pid)) {
        uniquePatientsMap.set(pid, {
          patient,
          lastConsultation: appt.updatedAt,
          status: appt.status, // include the latest appointment status
        });
      }
    }

    const recentPatients = Array.from(uniquePatientsMap.values());

    return NextResponse.json(recentPatients, { status: 200 });
  } catch (error) {
    console.error("Error fetching recent patients:", error);
    return NextResponse.json(
      { error: "Failed to fetch recent patients" },
      { status: 500 }
    );
  }
}
