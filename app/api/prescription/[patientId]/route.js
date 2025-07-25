import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import Prescription from "@/app/models/Prescription";
import Doctor from "@/app/models/Doctor";
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

    // Step 2: Create a map of appointmentId to doctor name
    const appointmentIdToDoctorName = {};

    for (const appt of appointments) {
      const doctor = await Doctor.findById(appt.docId).select(
        "firstName lastName"
      );
      if (doctor) {
        appointmentIdToDoctorName[
          appt._id.toString()
        ] = `${doctor.firstName} ${doctor.lastName}`;
      }
    }

    // Step 3: Find prescriptions linked to these appointment IDs
    const appointmentIds = appointments.map((appt) => appt._id);
    const prescriptions = await Prescription.find({
      appointment_id: { $in: appointmentIds },
    }).sort({ createdAt: -1 });

    // Step 4: Attach doctorName to each prescription
    const enrichedPrescriptions = prescriptions.map((prescription) => {
      const doctorName =
        appointmentIdToDoctorName[prescription.appointment_id.toString()] ||
        "Unknown Doctor";
      return {
        ...prescription.toObject(),
        doctorName,
      };
    });

    return NextResponse.json(enrichedPrescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions with doctor info:", error);
    return NextResponse.json(
      { message: "Failed to fetch prescriptions" },
      { status: 500 }
    );
  }
}
