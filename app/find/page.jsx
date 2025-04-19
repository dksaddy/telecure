import React from "react";
import { Star } from "lucide-react";
import Voice from "./components/Voice";
import DoctorList from "./components/DoctorList";
import "./doctor.css";

const page = () => {
  return (
    <main className="pt-[80px]">
      <div className="container">
        <div className="grid grid-cols-4 gap-4">
          <div id="filter" className=" ">
            <div className="my-5">
              <h4 className="text-2xl font-bold text-foreground">Filter</h4>
              <p className="my-2 text-gray-400">Choose your preferences</p>
            </div>

            <div className="my-5">
              <label htmlFor="price" className="text-[18px] text-gray-500">
                Price Range
              </label>
              <input type="range" name="price" className="w-full" />
              <div className="w-full flex justify-between">
                <h6 className="text-primary text-[16px]">
                  Min: <span className="text-gray-500">TK 200</span>
                </h6>
                <h6 className="text-primary text-[16px]">
                  Max: <span className="text-gray-500">TK 50000</span>
                </h6>
              </div>
            </div>
            <hr className="border-gray-200 my-5" />
            <div className="my-5">
              <p className="text-[18px] text-gray-500">Availibility</p>
              <div className="flex items-center my-2 gap-3">
                <input
                  type="checkbox"
                  name="available"
                  className="h-4 w-4  outline-primary ring-primary rounded-[2px]"
                />
                <label htmlFor="available" className="text-[16px]">
                  Online Now
                </label>
              </div>
              <div className="flex items-center my-2 gap-3">
                <input
                  type="checkbox"
                  name="available"
                  className="h-4 w-4  rounded-[2px]"
                />
                <label htmlFor="available" className="text-[16px]">
                  Available in next 2 hours
                </label>
              </div>
              <div className="flex items-center my-2 gap-3">
                <input
                  type="checkbox"
                  name="available"
                  className="h-4 w-4  rounded-[2px]"
                />
                <label htmlFor="available" className="text-[16px]">
                  Available today
                </label>
              </div>
              <div className="flex items-center my-2 gap-3">
                <input
                  type="checkbox"
                  name="available"
                  className="h-4 w-4  rounded-[2px]"
                />
                <label htmlFor="available" className="text-[16px]">
                  Free doctors only
                </label>
              </div>
            </div>
            <hr className="border-gray-200 my-5" />
            <div className="my-5">
              <p className="text-[18px] text-gray-500">Rating</p>
              <div className="flex items-center my-2 gap-3">
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
                <Star className="h-8 w-8 fill-amber-400 text-amber-400" />
              </div>
            </div>
            <hr className="border-gray-200 my-5" />
            <div className="my-5">
              <p className="text-[18px] text-gray-500">Sort By</p>
              <div className="flex items-center my-2 gap-3"></div>
            </div>
          </div>

          <div id="doctors" className="col-span-3 h-screen ">
            <DoctorList />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
