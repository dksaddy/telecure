// components/AvailableTimes.js
export default function AvailableTimes({
  selectedDate,
  doctor,
  selectedTimeRange,
  handleTimeRangeSelect,
}) {
  if (!selectedDate) return null;

  const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
  const slots = doctor.availableSlots.find((s) => s.day === dayName)?.slots || [];

  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Available Time</h2>
      <div className="flex flex-wrap gap-2">
        {slots.map((slot, i) => {
          const label = `${slot.start} - ${slot.end}`;
          return (
            <button
              key={i}
              className={`min-w-[120px] p-2 rounded border border-purple-400 hover:bg-purple-100 text-sm ${selectedTimeRange === label ? "bg-blue-100 text-blue-800 rounded-full" : "bg-white text-black"
                }`}
              onClick={() => handleTimeRangeSelect(label)}
            >
              {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
