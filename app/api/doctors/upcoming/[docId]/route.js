import { NextResponse } from "next/server";
import dayjs from "dayjs";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import User from "@/app/models/User";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const { docId } = await params;

    const appointments = await Appointment.find({ docId: docId })
      .populate("patientId", "firstName lastName profileImage dateOfBirth")
      .sort({ date: 1, "interval.timeRange": 1 });

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctor's appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
