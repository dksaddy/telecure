import React from "react";
import { HeartPulse } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { Clipboard } from "lucide-react";
import { TestTube } from "lucide-react";
const page = () => {
  return (
    <div className="pt-[80px] container">
      <div className="grid grid-cols-4">
        <div className="col-span-3 ">
          <h3 className="text-2xl text-gray-800">Welcome MD Nadib,</h3>
          <p className="text-base text-gray-600 mt-2 mb-4">
            You have got no appointments for today
          </p>

          <div className="grid grid-cols-3 gap-y-4 gap-x-4">
            <div className=" p-5 bg-red-100 rounded-[10px] border-1 border-gray-400">
              <div className="flex gap-3 items-center  w-full">
                <div className="flex items-center bg-white p-2 rounded-[6px] justify-center">
                  <HeartPulse className="text-red-800" />
                </div>
                <h4 className="text-xl">Consultations</h4>{" "}
                <ChevronRight className="ml-auto" />
              </div>
              <p className="text-[12px] my-5 text-gray-600">
                Last Consultations 12.02.2025
              </p>
              <p className="text-base text-gray-800">
                04 All Time Consultaions
              </p>
            </div>
            <div className=" p-5 bg-violet-100 rounded-[10px] border-1 border-gray-400">
              <div className="flex gap-3 items-center  w-full">
                <div className="flex items-center bg-white p-2 rounded-[6px] justify-center">
                  <Clipboard className="text-violet-800" />
                </div>
                <h4 className="text-xl">Prescriptions</h4>
                <ChevronRight className="ml-auto" />
              </div>
              <p className="text-[12px] my-5 text-gray-600">
                Last Added 12.02.2025
              </p>
              <p className="text-base text-gray-800">
                04 Prescription Available
              </p>
            </div>
            <div className=" p-5 bg-red-100 rounded-[10px] border-1 border-gray-400">
              <div className="flex gap-3 items-center  w-full">
                <div className="flex items-center bg-white p-2 rounded-[6px] justify-center">
                  <TestTube className="text-red-800" />
                </div>
                <h4 className="text-xl">Lab Reports</h4>{" "}
                <ChevronRight className="ml-auto" />
              </div>
              <p className="text-[12px] my-5 text-gray-600">
                Last Test 12.02.2025
              </p>
              <p className="text-base text-gray-800">04 All Time Lab Reports</p>
            </div>
          </div>
          <div className="bg-slate-100 rounded-[10px] p-5 mt-5">
            <div className="flex mb-3 justify-between items-center w-full">
              <h4 className="text-xl text-gray-800 ">Upcomming Appointments</h4>
              <p className="text-primary underline text-base">View All</p>
            </div>
            <div className="bg-slate-200 h-25 rounded-[6px] p-4">
              <h5 className="text-lg">Hormone Therapy Consultation</h5>
              <p className="text-gray-600 text-base">
                Dr. John Doe, 12.02.2025, 10:00 AM{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
