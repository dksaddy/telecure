import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import mongoose from "mongoose";

// POST: Update payment status and redirect
export async function POST(req) {
  try {
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");

    if (!tran_id) {
      return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
    }

    await connectDB();

    const updated = await Appointment.findOneAndUpdate(
      { transactionId: new mongoose.Types.ObjectId(tran_id) },
      {
        paymentStatus: true,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    const redirectUrl = new URL("http://localhost:3000/payment/success");
    redirectUrl.searchParams.set("tran_id", tran_id);

    return NextResponse.redirect(redirectUrl.toString(), 303);

  } catch (error) {
    console.error("POST /api/payment/success error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET: Return appointment info as JSON
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const tran_id = searchParams.get("tran_id");

    if (!tran_id) {
      return NextResponse.json({ error: "Missing transaction ID" }, { status: 400 });
    }

    await connectDB();

    const appointment = await Appointment.findOne({
      transactionId: new mongoose.Types.ObjectId(tran_id),
    });

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      appointment: {
        date: appointment.date,
        interval: appointment.interval,
        paymentStatus: appointment.paymentStatus,
      },
    });

  } catch (error) {
    console.error("GET /api/payment/success error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
