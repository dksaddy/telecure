import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const tran_id = formData.get("tran_id");

    if (!tran_id) {
      return NextResponse.redirect("http://localhost:3000/payment/fail?error=missing_tran_id", 303);
    }

    await connectDB();

    const deleted = await Appointment.findOneAndDelete({
      transactionId: new mongoose.Types.ObjectId(tran_id),
    });

    if (!deleted) {
      return NextResponse.redirect("http://localhost:3000/payment/fail?error=appointment_not_found", 303);
    }

    // Successful deletion, redirect to frontend fail page with transaction ID
    const redirectUrl = new URL("http://localhost:3000/payment/fail");

    return NextResponse.redirect(redirectUrl.toString(), 303);
  } catch (error) {
    console.error("POST /api/payment/fail error:", error);
    return NextResponse.redirect("http://localhost:3000/payment/fail?error=server", 303);
  }
}
