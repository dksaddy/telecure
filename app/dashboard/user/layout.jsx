"use client";
import Profile from "../components/Profile";
import Header from "@/app/global_components/Header";

import { useAuth } from "@/app/context/AuthContext";
import LoadingModal from "@/app/global_components/LoadingModal";
export default function page({ children }) {
  const { user } = useAuth();
  if (user == null) return <LoadingModal />;
  return (
    <>
      <Header />
      <div className="container">
        <div className="flex gap-6 py-6">
          <div className="w-80 space-y-6">
            <Profile />
          </div>

          <div className="flex-1 space-y-6">{children}</div>
        </div>
      </div>

      {/* Footer */}
    </>
  );
}
