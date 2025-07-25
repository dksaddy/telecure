import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import dayjs from "dayjs";

export async function GET(req, { params }) {
  try {
    await connectDB();

    const { doc } = await params;

    const today = dayjs().startOf("day").toDate();
    const tomorrow = dayjs().add(1, "day").startOf("day").toDate();
    const yesterday = dayjs().subtract(1, "day").startOf("day").toDate();
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    // Today's appointments
    const todaysAppointments = await Appointment.countDocuments({
      docId: doc,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Yesterday's appointments
    const yesterdaysAppointments = await Appointment.countDocuments({
      docId: doc,
      date: {
        $gte: yesterday,
        $lt: today,
      },
    });

    // Total unique patients
    const totalPatients = await Appointment.distinct("patientId", {
      docId: doc,
    });

    // New patients this month (first-time appointments)
    const appointmentsThisMonth = await Appointment.find({
      docId: doc,
      date: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const newPatientIds = new Set();

    for (const appt of appointmentsThisMonth) {
      const previous = await Appointment.findOne({
        docId: doc,
        patientId: appt.patientId,
        date: { $lt: startOfMonth },
      });

      if (!previous) {
        newPatientIds.add(appt.patientId.toString());
      }
    }

    return NextResponse.json({
      todaysAppointments,
      appointmentsChange: todaysAppointments - yesterdaysAppointments,
      totalPatients: totalPatients.length,
      newThisMonth: newPatientIds.size,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
