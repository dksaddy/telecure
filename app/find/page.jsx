"use client";
import Voice from "./components/Voice";
import { useState } from "react";

import DoctorList from "./components/DoctorList";
import Filter from "./components/Filter";
import "./doctor.css";

const page = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  return (
    <main className="pt-[80px]">
      <div className="container">
        <div className="grid grid-cols-8 gap-8">
          <div id="doctors" className=" col-span-6 h-screen ">
            <DoctorList
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <div id="doctors" className="h-screen col-span-2">
            <Voice setSelectedCategory={setSelectedCategory} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
