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
    <div className="border-1 relative border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-300 bg-white">
      <div className="absolute left-0 top-5 flex gap-1  items-center bg-amber-100 rounded-r-md p-1">
        <p className="flex items-center gap-1 pb-0 mb-0 text-md font-semibold text-amber-500">
          {ratings}
          <Star className="fill-amber-500" />
        </p>
      </div>
      <div className="mt-10">
        <Image
          src={profileImage}
          width={120}
          height={120}
          className="rounded-full mx-auto ring-3 ring-white shadow-xl"
          alt="DP"
        />
      </div>
      <div>
        <h5 className="text-[18px] text-center my-3">
          {firstName + " " + lastName}
        </h5>
        <p className="text-gray-500 text-[16px] text-center mb-5 min-h-16">
          {education}
        </p>
        {specialization?.map((spec, index) => (
          <p
            key={index}
            className="text-sm bg-blue-100 text-blue-500 text-center py-2 text-[14px] font-semibold rounded-sm"
          >
            {spec}
          </p>
        ))}
      </div>{" "}
      <Link
        href={`/appointment?mydoc=${_id}`}
        className="btn btn-outline-green mt-10 w-full block"
      >
        Book Appinmtment
      </Link>
    </div>
  );
};

export default Doctor;
