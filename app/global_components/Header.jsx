"use client";
import React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Dropdown from "./Dropdown";
import { MessageSquareText, Bell } from "lucide-react";
import NotificationDropdown from "./Notification";
import Image from "next/image";

const Header = () => {
  const { user, logout } = useAuth();

  const pathName1 = usePathname();
  const isActive = (path) => pathName1 === path;

  return (
    <div
      className="w-full h-[80px] bg-white 
         shadow-md"
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

          <div className="flex items-center gap-3 ">
            <NotificationDropdown />
            <div>
              <Dropdown>
                <Image
                  src={user?.profileImage || "/dp/default.jpg"}
                  className="rounded-full"
                  height={32}
                  width={32}
                  alt="Profile Picture"
                />
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
