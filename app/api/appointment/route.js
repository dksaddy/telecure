import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import mongoose from "mongoose";
import axios from "axios";
import qs from "querystring";
import { uploadFile } from "@/app/utils/uploadFile";

export async function POST(req) {
  try {
    await connectDB();

    const form = await req.formData();

    const appointmentData = {};
    for (const [key, value] of form.entries()) {
      if (key === "interval") {
        appointmentData.interval = JSON.parse(value);
      } else if (key === "files") {
        // handled below
      } else {
        appointmentData[key] = value;
      }
    }

    const conflict = await Appointment.findOne({
      docId: appointmentData.docId,
      date: appointmentData.date,
      timeRange: appointmentData.timeRange,
      "interval.start": appointmentData.interval.start,
      "interval.end": appointmentData.interval.end,
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          error: "Time slot already booked.",
          conflict: true,
        },
        { status: 409 }
      );
    }

    const files = form.getAll("files");
    const allowedTypes = ["image/jpeg", "image/jpg", "application/pdf"];
    const maxTotalSize = 2 * 1024 * 1024;
    let totalSize = 0;
    const fileMetadataArray = [];

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: "Invalid file type." },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      totalSize += buffer.length;

      if (totalSize > maxTotalSize) {
        return NextResponse.json(
          { success: false, error: "Total file size exceeds 2MB." },
          { status: 400 }
        );
      }

      const fileName = `${Date.now()}-${file.name}`;
      const fileObj = new File([buffer], fileName, { type: file.type });

      const url = await uploadFile(fileObj, "patient-files");

      fileMetadataArray.push({
        name: file.name,
        url,
        size: buffer.length,
      });
    }

    appointmentData.files = fileMetadataArray;
    const transactionId = new mongoose.Types.ObjectId();
    appointmentData.transactionId = transactionId;

    // Generate Jitsi call link using transactionId
    const jitsiRoomName = `telecure-${transactionId.toString()}`;
    appointmentData.callLink = jitsiRoomName;

    const newAppointment = await Appointment.create(appointmentData);

    const data = {
      store_id: "telec6825e0b9ac650",
      store_passwd: "telec6825e0b9ac650@ssl",
      total_amount: 100,
      currency: "BDT",
      tran_id: transactionId.toString(),
      success_url: "https://telecure.vercel.app/api/payment/success",
      fail_url: "https://telecure.vercel.app/api/payment/fail",
      cancel_url: "https://dummy.cancel",
      shipping_method: "NO",
      product_name: "Appointment",
      product_category: "Service",
      product_profile: "general",
      cus_name: "Test",
      cus_email: "test@example.com",
      cus_add1: "Dhaka",
      cus_city: "Dhaka",
      cus_postcode: "1207",
      cus_country: "Bangladesh",
      cus_phone: "01700000000",
    };

    const response = await axios.post(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (response?.data?.GatewayPageURL) {
      return NextResponse.json({
        success: true,
        gatewayUrl: response.data.GatewayPageURL,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: "GatewayPageURL not returned",
        raw: response.data,
      });
    }
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
