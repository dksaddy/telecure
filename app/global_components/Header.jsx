"use client";
import React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./dropdown";
import { MessageSquareText, Bell, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const Header = () => {
  const [dropDown, setDropDown] = useState(false);
  const { user, logout } = useAuth();
  console.log(user);
  const toogleDropDown = () => {
    setDropDown(!dropDown);
  };

  const pathname = usePathname().startsWith("/auth");
  const pathName1 = usePathname();
  const isActive = (path) => pathName1 === path;

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
              <Image
                src="/logos/default.png"
                alt="Logo"
                height={80}
                width={180}
              />
            </Link>
            <ul className="flex items-center gap-2 text-background text-[18px]">
              <li>
                <Link
                  href="/"
                  className={`${buttonVariants({ variant: "link" })} ${
                    isActive("/")
                      ? "underline underline-offset-[12px] font-semibold text-primary"
                      : ""
                  }`}
                >
                  Home
                </Link>
              </li>

              {user?.role !== "doctor" && (
                <>
                  <li>
                    <Link
                      href="/find"
                      className={`${buttonVariants({ variant: "link" })} ${
                        isActive("/find")
                          ? "underline font-semibold underline-offset-[12px] text-primary"
                          : ""
                      }`}
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/find"
                      className={`${buttonVariants({ variant: "link" })} ${
                        isActive("/find")
                          ? "underline font-semibold underline-offset-[12px] text-primary"
                          : ""
                      }`}
                    >
                      Consultation
                    </Link>
                  </li>
                </>
              )}

              <li>
                <Link
                  href="/about"
                  className={`${buttonVariants({ variant: "link" })} ${
                    isActive("/about")
                      ? "underline font-semibold underline-offset-[12px] text-primary"
                      : ""
                  }`}
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className={`${buttonVariants({ variant: "link" })} ${
                    isActive("/contact")
                      ? "underline font-semibold underline-offset-[12px] text-primary"
                      : ""
                  }`}
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
                  <Image
                    src={user.profileImage}
                    className="rounded-full"
                    height={32}
                    width={32}
                    alt="Profile Picture"
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
