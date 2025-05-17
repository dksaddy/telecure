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
      <h2 className="text-lg font-semibold mb-2">Available Time</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {slots.map((slot, i) => {
          const label = `${slot.start} - ${slot.end}`;
          return (
            <button
              key={i}
              className={`min-w-[120px] p-2 rounded border text-sm ${selectedTimeRange === label
                  ? "bg-purple-600 text-white"
                  : "bg-white text-black"
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
