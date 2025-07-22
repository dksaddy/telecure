"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, LogOut, Pill, Settings } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";

const Quick = () => {
  const { logout } = useAuth();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/find" className="block">
            <Button className="w-full bg-blue-500 hover:bg-blue-600">
              <Calendar className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
          </Link>
          <Link className="block" href="user/pres">
            <Button variant="outline" className="w-full bg-transparent">
              <Pill className="w-4 h-4 mr-2" />
              View Prescriptions
            </Button>
          </Link>

          <Button variant="destructive" onClick={logout} className="w-full">
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default Quick;
