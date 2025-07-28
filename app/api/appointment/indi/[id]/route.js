// File: /app/api/appointments/[id]/route.js

import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import mongoose from "mongoose";
import Doctor from "@/app/models/Doctor";
import Prescription from "@/app/models/Prescription";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: "Invalid appointment ID" },
        { status: 400 }
      );
    }

    // Fetch appointment by ID
    const appointment = await Appointment.findById(id).populate("docId");

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    // Fetch prescription for this appointment
    const prescription = await Prescription.findOne({
      appointment_id: appointment._id,
    });

    // Format the response to match your UI data structure
    const responseData = {
      id: `APT-${appointment._id.toString().slice(-6).toUpperCase()}`,
      date: appointment.date,
      time: appointment.timeRange,
      status: appointment.status,
      paymentStatus: appointment.paymentStatus ? "complete" : "pending",
      doctor: {
        name: `Dr. ${appointment.docId.firstName} ${appointment.docId.lastName}`,
        email: appointment.docId.email,
        specialty: appointment.docId.specialty || "General Physician",
        avatar: appointment.docId.profileImage || "/placeholder.svg",
      },
      patient: {
        fullName: appointment.name,
        age: `${appointment.age} years`,
        gender: appointment.gender,
        phone: appointment.phone,
        height: `${appointment.heightFeet}'${appointment.heightInch}"`,
        weight: `${appointment.weight} lbs`,
      },
      prescription: prescription
        ? {
            complaints: prescription.complaints.join(", "),
            diagnosis: prescription.diagnosis.join(", "),
            investigations: prescription.investigation.join(", "),
            medications: prescription.medication.map((med) => ({
              medication: med.name,
              dosage: med.fullData.strength || "-",
              frequency: med.frequency.join(", "),
              duration: med.duration,
              instructions: med.instruction,
            })),
          }
        : null,
      files: appointment.files.map((file) => ({
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.split(".").pop(),
        url: file.url,
      })),
      createdAt: new Date(appointment.createdAt).toLocaleString(),
      updatedAt: new Date(appointment.updatedAt).toLocaleString(),
    };

    return NextResponse.json(responseData);
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch appointment" },
      { status: 500 }
    );
  }
}
