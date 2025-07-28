import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor";
import { uploadFile } from "@/app/utils/uploadFile";

export async function POST(req) {
  await connectDB();

  try {
    const form = await req.formData();

    // Extract basic fields
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const email = form.get("email");
    const phone = form.get("phone");
    const gender = form.get("gender");
    const password = form.get("password");
    const education = form.get("education");
    const experience = parseInt(form.get("experience"), 10) || 0;
    const bio = form.get("bio");
    const specialization = JSON.parse(form.get("specialization"));
    const slots = JSON.parse(form.get("availableSlots")); // must be stringified object

    // Profile Image
    const profileImageFile = form.get("profileImage");
    let profileImageUrl = "";
    if (profileImageFile && typeof profileImageFile === "object") {
      profileImageUrl = await uploadFile(profileImageFile, "profiles");
    }

    // Certificates
    const certificateFiles = form.getAll("certificates");
    const certificates = [];

    for (const file of certificateFiles) {
      if (file && typeof file === "object") {
        const url = await uploadFile(file, "certificates");
        certificates.push({
          name: file.name,
          url,
          issuedBy: "Admin", // optional dynamic value
        });
      }
    }

    const doctor = await Doctor.create({
      firstName,
      lastName,
      email,
      phone,
      gender,
      password,
      education,
      experience,
      bio,
      specialization,
      availableSlots: slots,
      profileImage: profileImageUrl,
      certificates,
      isVerified: true,
      ratings: 0,
      reviews: [],
      createdAt: new Date(),
    });

    return NextResponse.json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error adding doctor:", error);
    return NextResponse.json(
      { error: "Failed to add doctor", details: error.message },
      { status: 500 }
    );
  }
}
