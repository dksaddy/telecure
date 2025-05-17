import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Appointment from "@/app/models/Appointment";
import { writeFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import mongoose from "mongoose"; // Import mongoose for ObjectId
import axios from "axios";
import qs from "querystring"; // Add this for form encoding

export async function POST(req) {
  try {
    await connectDB();

    const form = await req.formData();

    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const appointmentData = {};
    for (const [key, value] of form.entries()) {
      if (key === "interval") {
        appointmentData.interval = JSON.parse(value);
      } else if (key === "files") {
        // skip here, handled below
      } else {
        appointmentData[key] = value;
      }
    }

    const conflict = await Appointment.findOne({
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

      const filename = `${uuidv4()}-${file.name}`;
      const uploadPath = path.join(uploadDir, filename);

      await writeFile(uploadPath, buffer);

      fileMetadataArray.push({
        name: file.name,
        url: `/uploads/${filename}`,
        size: buffer.length,
      });
    }

    appointmentData.files = fileMetadataArray;
    const transactionId = new mongoose.Types.ObjectId();
    appointmentData.transactionId = transactionId;
    const newAppointment = await Appointment.create(appointmentData);

    const data = {
      store_id: "telec6825e0b9ac650",
      store_passwd: "telec6825e0b9ac650@ssl",
      total_amount: 100,
      currency: "BDT",
      tran_id: transactionId.toString(),
      success_url: "http://localhost:3000/api/payment/success",
      fail_url: "http://localhost:3000/payment/fail",
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
      qs.stringify(data), // 🔥 Convert to URL-encoded form
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
