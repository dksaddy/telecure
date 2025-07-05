"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context.js/AuthContext";
import Dropdown from "./dropdown";
import { MessageSquareText, Bell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const { user, logout } = useAuth();
  const toogleDropDown = () => {
    setDropDown(!dropDown);
  };

  const pathname = usePathname().startsWith("/auth");

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    !pathname && (
      <div
        className={`fixed top-0 w-screen h-[80px] bg-white z-50 transition-shadow ${
          isScrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container h-full">
          <div className="flex items-center justify-between h-full">
            <Link href="/">
              <img src="/logos/default.png" alt="Logo" className="h-10 " />
            </Link>
            <ul className="flex items-center gap-8 text-background text-[18px] ">
              <li className="nav-link active">
                <Link href="/">Home</Link>
              </li>
              {user?.role !== "doctor" && (
                <li className="nav-link">
                  <Link href="/find">Find a doctor</Link>
                </li>
              )}

              <li className="nav-link">
                <Link href="/find">About Us</Link>
              </li>
              <li className="nav-link">
                <Link href="/find">Contact Us</Link>
              </li>
              <li className="ms-5">
                {!user ? (
                  <Link href="/auth/login">
                    <button className="btn btn-primary">Sign in</button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 ">
                    <Link href="message">
                      <MessageSquareText className="text-gray-600 w-7 h-7 hover:text-gray-700 transition-all hover:scale-110" />
                    </Link>
                    <Link href="notification">
                      <Bell className="text-gray-600 w-7 h-7 hover:text-gray-700 transition-all hover:scale-110" />
                    </Link>
                    <div
                      className={`flex items-center gap-0 cursor-pointer p-2 relative rounded-lg transition outline-2 ${
                        dropDown && "  outline-gray-300 "
                      }`}
                      onClick={toogleDropDown}
                    >
                      <img
                        src={user.profileImage}
                        className="h-8 rounded-full "
                        alt=""
                      />

                      <ChevronDown className="h-7 w-7 text-gray-600" />
                      <Dropdown
                        state={dropDown}
                        change={toogleDropDown}
                        logout={logout}
                      />
                    </div>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
