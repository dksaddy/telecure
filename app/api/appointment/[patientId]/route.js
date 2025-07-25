import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import mongoose from "mongoose";
import Doctor from "@/app/models/Doctor";
export async function GET(req, { params }) {
  await connectDB();

  try {
    const { patientId } = await params;

    const appointments = await Appointment.find({
      patientId: new mongoose.Types.ObjectId(patientId),
    }).populate("docId"); // Now mongoose knows what Doctor is!

    return NextResponse.json(appointments);
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
