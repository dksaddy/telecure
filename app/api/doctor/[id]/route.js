import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Doctor from "@/app/models/Doctor"; // ✅ Change here
import mongoose from "mongoose";

import { uploadFile } from "@/app/utils/uploadFile";

export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid doctor ID" }, { status: 400 });
    }

    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const imageFile = form.get("profileImage");

    let profileImageUrl;

    // ✅ Upload profile image if provided
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      profileImageUrl = await uploadFile(imageFile, "profiles");
    }

    // ✅ Update doctor document
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      id,
      {
        ...(name && {
          firstName: name.split(" ")[0],
          lastName: name.split(" ").slice(1).join(" "),
        }),
        ...(email && { email }),
        ...(profileImageUrl && { profileImage: profileImageUrl }),
      },
      { new: true }
    );

    if (!updatedDoctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Doctor profile updated successfully",
      doctor: {
        id: updatedDoctor._id,
        name: `${updatedDoctor.firstName} ${updatedDoctor.lastName}`,
        email: updatedDoctor.email,
        profileImage: updatedDoctor.profileImage,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update doctor profile" },
      { status: 500 }
    );
  }
}
