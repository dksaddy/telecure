import {
  Bell,
  Calendar,
  FileText,
  BarChart3,
  Clock,
  Users,
  DollarSign,
  Star,
  Phone,
  MoreVertical,
  User,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Schedule from "./Components/Schedule";
import { Badge } from "@/components/ui/badge";
import Shots from "./Components/Shots";
import Upcoming from "./Components/Upcoming";
import Recent from "./Components/Recent";

export default function DoctorDashboard() {
  return (
    <div>
      <div>
        {/* Metrics Cards */}
        <Shots />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <Upcoming />

            {/* Recent Patients */}
            <Recent />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Actions */}

            {/* Today's Schedule */}
            <Schedule />
            {/* Recent Notifications */}
          </div>
        </div>
      </div>
    </div>
  );
}
