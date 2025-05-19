"use client";
import Voice from "./components/Voice";
import { useState } from "react";

import DoctorList from "./components/DoctorList";

import "./doctor.css";

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <main className="pt-[80px]">
      <div className="container mx-auto">
        <h4 className="text-lg my-5 text-gray-500 font-medium">
          Home Page / <span className="text-primary">Find a doctor</span>
        </h4>

        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div id="Filters" className="col-span-12 md:col-span-3">
            <div className=" h-full w-full min-h-[300px] p-4"></div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {/* Voice Component */}
            <div>
              <Voice />
            </div>

            {/* Doctors List */}
            <div id="doctors">
              <DoctorList
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
