import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import User from "@/app/models/User";

export async function GET(req, { params }) {
  await connectDB();
  const { docId } = await params;

  try {
    // Find recent appointments of the doctor, sorted by date descending
    const recentAppointments = await Appointment.find({ docId: docId })
      .populate("patientId", "firstName lastName profileImage dateOfBirth")
      .sort({ updatedAt: -1 });

    const uniquePatientsMap = new Map();

    for (let appt of recentAppointments) {
      const pid = appt.patientId?._id?.toString();
      if (pid && !uniquePatientsMap.has(pid)) {
        uniquePatientsMap.set(pid, {
          patient: appt.patientId,
          lastConsultation: appt.updatedAt,
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
