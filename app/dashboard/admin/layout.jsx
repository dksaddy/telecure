import React from "react";
import Header from "@/app/global_components/Header";
const layout = ({ children }) => {
  const sidebarItems = [{ name: "Dashboard", icon: "📊", active: true }];
  return (
    <>
      <Header />
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-slate-800 text-white">
          <div className="p-4">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
                H
              </div>
              <span className="font-semibold">Telecure Admin </span>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 px-3 py-2 rounded cursor-pointer ${
                    item.active ? "bg-slate-700" : "hover:bg-slate-700"
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </div>
              ))}
            </nav>
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default layout;
