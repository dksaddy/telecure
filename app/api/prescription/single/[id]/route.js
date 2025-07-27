import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Prescription from "@/app/models/Prescription";
import Medicine from "@/app/models/Medicine";
import Appointment from "@/app/models/Appointment";
// GET /api/prescriptions/:id
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const prescription = await Prescription.findById(id).lean();
    if (!prescription) {
      return NextResponse.json(
        { error: "Prescription not found" },
        { status: 404 }
      );
    }

    const appointment = await Appointment.findById(
      prescription.appointment_id
    ).lean();

    const data = {
      doctor: {
        name: "Dr. Sarah Johnson", // Optional: replace with actual doctor info from docId
        specialization: "Cardiology",
      },
      appointment: {
        date: appointment?.date,
        time: appointment?.timeRange,
      },
      patient: {
        name: appointment?.name,
        gender: appointment?.gender,
        age: appointment?.age,
        weight: appointment?.weight,
        height: `${appointment?.heightFeet}'${appointment?.heightInch}"`,
        patientId: appointment?.patientId || "",
        bloodGroup: "O+", // Optional: add from schema or hardcoded
      },
      complaints: prescription.complaints,
      diagnosis: prescription.diagnosis,
      investigation: prescription.investigation,
      medications: prescription.medication.map((med) => ({
        name: med.name,
        frequency: med.frequency.join(", "),
        duration: med.duration,
        instruction: med.instruction,
        fullData: {
          brandName: med.fullData.brandName,
          generic: med.fullData.generic,
          dosageForm: med.fullData.dosageForm,
          strength: med.fullData.strength || "",
          manufacturer: med.fullData.manufacturer,
          packageContainer: med.fullData.packageContainer,
          packageSize: med.fullData.packageSize || "",
          type: med.fullData.type,
        },
      })),
      notes:
        "Patient should maintain a low-sodium diet and exercise regularly. Follow-up in 4 weeks.",
    };

    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    console.error("[API ERROR]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
