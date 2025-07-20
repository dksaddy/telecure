"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context.js/AuthContext";
import Dropdown from "./dropdown";
import { MessageSquareText, Bell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

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
            <ul className="flex items-center gap-2 text-background text-[18px] ">
              <li>
                <Link
                  href="/"
                  className={`${buttonVariants({ variant: "link" })} `}
                >
                  Home
                </Link>
              </li>
              {user?.role !== "doctor" && (
                <>
                  <li>
                    <Link
                      href="/find"
                      className={buttonVariants({ variant: "link" })}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/find"
                      className={buttonVariants({ variant: "link" })}
                    >
                      Consultation
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  href="/about"
                  className={buttonVariants({ variant: "link" })}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={buttonVariants({ variant: "link" })}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
            {!user ? (
              <div className="flex gap-1 items-center">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="hover:cursor-pointer"
                    variant="ghost"
                  >
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" className="hover:cursor-pointer">
                    Get Started
                  </Button>
                </Link>
              </div>
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
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
