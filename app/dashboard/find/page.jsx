"use client";
import Voice from "./components/Voice";
import { useState } from "react";
import Filter from "./components/Filter";
import DoctorList from "./components/DoctorList";

import "./doctor.css";

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <main>
      <div className="mx-auto block w-[400px]">
        <h2 className="text-5xl my-3 text-center pb-2  border-b-2 border-primary">
          Find a Doctor
        </h2>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div id="Filters" className="col-span-12 md:col-span-3">
            <div>
              <Voice />
            </div>
            <div className=" h-full w-full min-h-[300px] py-4">
              <Filter />
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 space-y-6">
            {/* Voice Component */}

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
