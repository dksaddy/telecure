import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import User from "@/app/models/User";
import mongoose from "mongoose";

import { uploadFile } from "@/app/utils/uploadFile";

export async function PATCH(req, { params }) {
  await connectDB();

  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const form = await req.formData();
    const name = form.get("name");
    const email = form.get("email");
    const imageFile = form.get("profileImage");

    let profileImageUrl;

    // If a file is uploaded, upload to Supabase
    if (imageFile && typeof imageFile === "object" && imageFile.size > 0) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      // Supabase expects a Blob/File object
      profileImageUrl = await uploadFile(imageFile, "profiles");
    }

    // Update user document
    const updatedUser = await User.findByIdAndUpdate(
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

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: updatedUser._id,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        email: updatedUser.email,
        profileImage: updatedUser.profileImage,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
