import Profile from "./components/Profile";
import Quick from "./components/Quick";
import Appointments from "./components/Appointments";
import Pres from "./components/Pres";
import Medicine from "./components/Medicine";
export default function page() {
  return (
    <div className="min-h-screen container pt-[80px] bg-gray-50">
      {/* Header */}

      <div className="flex gap-6 p-6">
        {/* Left Sidebar */}
        <div className="w-80 space-y-6">
          {/* Patient Profile Card */}
          <Profile />
          {/* Quick Actions */}
          <Quick />
        </div>

        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* My Appointments */}
          <Appointments />

          {/* My Prescriptions */}
          <Pres />
          {/* Medicines Lookup */}
          <Medicine />
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}
