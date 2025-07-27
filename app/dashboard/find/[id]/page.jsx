"use client";
import React from "react";
import Input from "@mui/material/Input";

const page = () => {
  return (
    <div className="pt-20 container">
      <h4 className="text-xl mb-5 text-gray-500 text-medium">
        Home Page / Find a doctor /
        <span className="text-primary"> Dr. John doe</span>
      </h4>

      <div className="mt-10 grid grid-cols-3">
        <div className="bg-gray-500">
          <img
            src="/dp/doc.jpg"
            alt=""
            className="rounded-full mb-5"
            height={200}
            width={200}
          />
          <h4 className="text-xl ">Dr John Doe</h4>
          <p className="px-5 py-3 bg-blue-200 text-primary text-lg text-center">
            Cardiology
          </p>
          <Input></Input>
        </div>
      </div>
    </div>
  );
};

export default page;
