"use client";
import React, { useRef } from "react";
import Link from "next/link";

const Dropdown = ({ state, change, logout }) => {
  const dropDownRef = useRef(null);

  const handleClick = (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      change(false);
    }
  };

  return (
    <div
      ref={dropDownRef}
      className={`absolute top-[110%] right-[0%] w-[200px] bg-gray-200 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out z-50 ${
        state
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-95 pointer-events-none"
      }`}
    >
      <ul className="flex flex-col gap-0 text-foreground text-[16px] text-center">
        <li className="hover:bg-gray-500 rounded-t-lg py-3 pt-4.5 transition-all cursor-pointer">
          <Link href="/user">Dashboard</Link>
        </li>
        <li className="hover:bg-gray-500 py-3 transition-all cursor-pointer">
          <Link href="/account">Settings</Link>
        </li>
        <div className="px-7">
          <hr className="border-gray-300" />
        </div>

        <button
          onClick={logout}
          className="font-medium hover:bg-red-700 rounded-b-lg py-3 pb-4.5 transition-all cursor-pointer hover:text-white text-red-800"
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Dropdown;
