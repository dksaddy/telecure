"use client";
import React, { useEffect, useState } from "react";
import { Calendar, Users, DollarSign, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/app/context/AuthContext";

const Shots = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const fetchStats = async () => {
      try {
        const res = await fetch(`/api/doctors/doc/${user.id}`);
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Today's Appointments
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.todaysAppointments || 0}
              </p>
              <p className="text-sm text-green-600">
                {stats?.appointmentsChange >= 0 ? "+" : ""}
                {stats?.appointmentsChange} from yesterday
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Patients
              </p>
              <p className="text-3xl font-bold text-gray-900">
                {stats?.totalPatients || 0}
              </p>
              <p className="text-sm text-green-600">
                +{stats?.newThisMonth || 0} this month
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Satisfaction Rate
              </p>
              <p className="text-3xl font-bold text-gray-900">4.8</p>
              <p className="text-sm text-green-600">+0.2 this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Shots;
