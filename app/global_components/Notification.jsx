"use client";

import React from "react";
import { Bell, CalendarPlus, Upload, Clock, MessageSquare } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

// Icon mapping (no TS types)
const iconMap = {
  CalendarPlus,
  Upload,
  Clock,
  MessageSquare,
};

const NotificationDropdown = () => {
  const [notifications, setNotifications] = React.useState([
    {
      id: 1,
      icon: "CalendarPlus",
      title: "New appointment booked",
      description: "Dr. Sarah Johnson scheduled for tomorrow at 2:00 PM",
      time: "5 mins ago",
      read: false,
    },
    {
      id: 2,
      icon: "Upload",
      title: "Patient file uploaded",
      description: "John Doe uploaded lab results",
      time: "12 mins ago",
      read: false,
    },
    {
      id: 3,
      icon: "Clock",
      title: "Schedule change",
      description: "Appointment with Maria Garcia moved to 3:30 PM",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 4,
      icon: "MessageSquare",
      title: "New message received",
      description: "Patient inquiry about prescription refill",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          <Bell className="h-10 w-10 text-lg text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">View notifications</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-80 p-0 shadow-lg">
        <DropdownMenuLabel className="px-4 py-3 text-lg font-bold text-gray-800">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-0" />

        {notifications.length > 0 ? (
          notifications.map((notification, index) => {
            const IconComponent = iconMap[notification.icon];
            return (
              <React.Fragment key={notification.id}>
                <DropdownMenuItem className="flex cursor-pointer items-start gap-3 px-4 py-3 transition-colors hover:bg-gray-50 focus:bg-gray-50">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800">
                        {notification.title}
                      </span>
                      {!notification.read && (
                        <span className="h-2 w-2 shrink-0 rounded-full bg-gray-400" />
                      )}
                    </div>
                    <span className="text-sm text-gray-600">
                      {notification.description}
                    </span>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                </DropdownMenuItem>
                {index < notifications.length - 1 && (
                  <DropdownMenuSeparator className="my-0 h-[1px] bg-gray-200" />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <DropdownMenuItem className="px-4 py-3 text-sm text-gray-500">
            No new notifications.
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator className="my-0" />
        <div className="flex justify-between px-4 py-3">
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-medium text-blue-600 hover:text-blue-700"
            onClick={handleMarkAllAsRead}
          >
            Mark all as read
          </Button>
          <Button
            variant="link"
            className="h-auto p-0 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View all
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
