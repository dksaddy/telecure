import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";

const Doctor = ({
  _id,
  firstName,
  lastName,
  ratings,
  education,
  specialization,
  profileImage,
}) => {
  return (
    <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-xl">
      {/* Ratings badge */}
      <div className="absolute top-4 left-4 flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-sm font-medium text-amber-600">
        {ratings}
        <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
      </div>

      {/* Profile Image */}
      <div className="mt-6 flex justify-center">
        <Image
          src={profileImage}
          width={100}
          height={100}
          className="rounded-full h-25 w-25 border-4 border-white shadow-md"
          alt={`${firstName} ${lastName} profile image`}
        />
      </div>

      {/* Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {firstName} {lastName}
        </h3>
        <p className="text-sm text-gray-500">{education}</p>
      </div>

      {/* Specializations */}
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {specialization?.map((spec, index) => (
          <span
            key={index}
            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Button */}
      <Link
        href={`/appointment?mydoc=${_id}`}
        className="mt-6 block w-full rounded-md bg-green-600 px-4 py-2 text-center text-white font-medium hover:bg-green-700 transition"
      >
        Book Appointment
      </Link>
    </div>
  );
};

export default Doctor;
