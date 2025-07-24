import React from "react";
import { User, Clock, Video, Shield, Search, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const Find = () => {
  return (
    <>
      <Card className="w-full  p-6 bg-white">
        <div className="flex items-center gap-8">
          {/* Left side - Icon and main content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Need Medical Consultation?
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Connect with qualified healthcare professionals instantly
                  through our telemedicine platform
                </p>
              </div>
            </div>

            {/* Features in horizontal layout */}
            <div className="flex gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  24/7 Available Doctors
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Video className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Video & Audio Consultations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  Secure & Private
                </span>
              </div>
            </div>
          </div>

          {/* Right side - Stats and actions */}
          <div className="flex-shrink-0 space-y-4">
            {/* Statistics in horizontal layout */}
            <div className="flex gap-6 justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">500+</div>
                <div className="text-xs text-gray-500">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">50k+</div>
                <div className="text-xs text-gray-500">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">4.8★</div>
                <div className="text-xs text-gray-500">Rating</div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-3">
              <Link href="/find" className="block">
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <Search className="w-4 h-4 mr-2" />
                  Find Doctor
                </Button>
              </Link>
              <p className="text-xs text-gray-500 text-center">
                Start your consultation in less than 2 minutes
              </p>
              <Button
                variant="outline"
                className="w-full text-red-500 border-red-200 hover:bg-red-50 bg-transparent"
              >
                <Phone className="w-4 h-4 mr-2" />
                Emergency: 911
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Find;
