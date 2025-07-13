"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { splitIntoIntervals } from "./utils/splitsSlots";
import { getNext30DaysFor } from "./utils/getNextDates";
import LoadingModal from "../global_components/LoadingModal";
import { useAuth } from "@/app/context.js/AuthContext";
import DocSchedule from "./components/docSchedule";
import AvailableTimes from "./components/availableTime";
import DocDetails from "./components/docDetail";
import PatientDetails from "./components/patientDetails";
import AvailableInterval from "./components/availableInterval";

export default function BookAppointment() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const docId = searchParams.get("mydoc");

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState(null);
  const [selectedInterval, setSelectedInterval] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({});
  const [bookedIntervals, setBookedIntervals] = useState([]);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await fetch("/api/mydoc", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ docId }),
        });

        if (!response.ok) throw new Error("Failed to fetch doctor details");
        const data = await response.json();
        setDoctor(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (docId) fetchDoctorDetails();
  }, [docId]);

  useEffect(() => {
    const fetchBookedIntervals = async () => {
      if (!doctor || !selectedDate || !selectedTimeRange) return;

      try {
        const res = await fetch("/api/appointment/booked-intervals", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            doctorId: doctor._id, // ✅ Correct doctor ID from fetched doctor
            date: selectedDate.toDateString(),
            timeRange: selectedTimeRange,
          }),
        });

        const data = await res.json();
        console.log("✅ Booked Intervals:", data.bookedIntervals);
        setBookedIntervals(data.bookedIntervals || []);
      } catch (err) {
        console.error("❌ Error fetching booked intervals:", err);
      }
    };

    fetchBookedIntervals();
  }, [doctor, selectedDate, selectedTimeRange]);


  if (loading) return <LoadingModal />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );

  const validDays = doctor.availableSlots.map((slot) => slot.day);
  const dates = getNext30DaysFor(validDays);

  const getDaySlots = (date, range) => {
    const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
    const slotInfo = doctor.availableSlots.find((s) => s.day === dayName);
    if (!slotInfo || !range) return [];

    const [rangeStart, rangeEnd] = range.split(" - ");
    const filteredSlots = slotInfo.slots.filter(
      (slot) => `${slot.start} - ${slot.end}` === range
    );

    const intervals = filteredSlots.flatMap((slot) =>
      splitIntoIntervals(slot.start, slot.end)
    );

    // Filter out booked intervals
    return intervals.filter(
      (interval) =>
        !bookedIntervals.some(
          (b) => b.start === interval.start && b.end === interval.end
        )
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTimeRange(null);
    setSelectedInterval(null);
    setAppointmentDetails((prev) => ({ ...prev, date: date.toDateString() }));
  };

  const handleTimeRangeSelect = (range) => {
    setSelectedTimeRange(range);
    setSelectedInterval(null);
    setAppointmentDetails((prev) => ({ ...prev, timeRange: range }));
  };

  const handleIntervalSelect = (interval) => {
    setSelectedInterval(interval);
    setAppointmentDetails((prev) => ({ ...prev, interval }));
  };

  Object.assign(appointmentDetails, {
    doctorId: docId,
    patientId: user.id,
    patientName: user.name,
    patientDOB: user.dateOfBirth,
  });

  return (
    <div className="grid grid-cols-12 gap-1 px-20 py-8 pt-[80px]">

      <div className="col-span-12 md:col-span-4 p-2 rounded-lg shadow-md">
        <DocDetails doctor={doctor} />
      </div>

      <div className="col-span-12 md:col-span-8 p-8 bg-gray-50 rounded-lg shadow-md">
        <DocSchedule
          selectedDate={selectedDate}
          dates={dates}
          handleDateSelect={handleDateSelect}
        />

        <AvailableTimes
          selectedDate={selectedDate}
          doctor={doctor}
          selectedTimeRange={selectedTimeRange}
          handleTimeRangeSelect={handleTimeRangeSelect}
        />

        {selectedDate && selectedTimeRange && (
          <AvailableInterval
            intervals={getDaySlots(selectedDate, selectedTimeRange)}
            selectedInterval={selectedInterval}
            selectedDate={selectedDate}
            handleIntervalSelect={handleIntervalSelect}
          />
        )}


        <PatientDetails
          appointmentDetails={appointmentDetails}
          selectedInterval={selectedInterval}
        />

      </div>
    </div>
  );
}
