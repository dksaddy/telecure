export default function AvailableInterval({
  intervals,
  selectedInterval,
  selectedDate,
  handleIntervalSelect,
}) {
  const now = new Date();

  return (
    <>
      <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Select Appointment Time</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {intervals.map((interval, i) => {
          const label = `${interval.start} - ${interval.end}`;
          const slotDate = new Date(selectedDate);
          let [hour, minutePart] = interval.start.split(":");
          const minutes = parseInt(minutePart);
          let hourNum = parseInt(hour);
          const isPM = interval.start.includes("PM");

          if (isPM && hourNum < 12) hourNum += 12;
          if (!isPM && hourNum === 12) hourNum = 0;

          slotDate.setHours(hourNum, minutes, 0, 0);
          const isPast = slotDate < now;

          return (
            <button
              key={i}
              disabled={isPast}
              className={`flex items-center justify-center text-sm border rounded p-2 ${isPast
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : selectedInterval?.start === interval.start
                    ? "bg-blue-100 text-blue-800 rounded-full"
                    : "bg-white text-purple-800 border-purple-400 hover:bg-purple-100"
                }`}
              onClick={() => !isPast && handleIntervalSelect(interval)}
            >
              🕒 {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
