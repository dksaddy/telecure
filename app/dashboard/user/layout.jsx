"use client";
import Profile from "./components/Profile";

import Appointments from "./components/Appointments";
import Pres from "./components/Pres";
import Medicine from "./components/Medicine";
import { useAuth } from "@/app/context/AuthContext";
import LoadingModal from "@/app/global_components/LoadingModal";
export default function page({ children }) {
  const { user } = useAuth();
  if (user == null) return <LoadingModal />;
  return (
    <div className="min-h-screen container ">
      {/* Header */}

      <div className="flex gap-6 py-6">
        <div className="w-80 space-y-6">
          <Profile />
        </div>

        <div className="flex-1 space-y-6">{children}</div>
      </div>

      {/* Footer */}
    </div>
  );
}
