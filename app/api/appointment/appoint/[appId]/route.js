import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import Doctor from "@/app/models/Doctor"; // Add this import

export async function GET(req, { params }) {
  await connectDB();

  const { appId } = await params;

  try {
    // Find the appointment
    const appointment = await Appointment.findById(appId).lean();
    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Fetch doctor info using docId from the appointment
    const doctor = await Doctor.findById(appointment.docId)
      .select("firstName lastName specialization profileImage")
      .lean();

    return NextResponse.json({
      ...appointment,
      doctorInfo: doctor || null,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  await connectDB();

  const { appId } = await params;

  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(appId);

    if (!deletedAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Appointment deleted successfully", deletedAppointment },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Server error", details: error.message },
      { status: 500 }
    );
  }
}
