export default function DocSchedule({ selectedDate, dates, handleDateSelect }) {
    return (
        <>
            <h2 className="text-lg font-semibold mb-2">Doctor Schedules</h2>
            <div className="flex overflow-x-auto gap-2 mb-4">
                {dates.map((d, i) => (
                    <button
                        key={i}
                        className={`min-w-[80px] text-center p-3 rounded border ${selectedDate?.toDateString() === d.toDateString()
                                ? "bg-purple-600 text-white"
                                : "bg-white text-black"
                            }`}
                        onClick={() => handleDateSelect(d)}
                    >
                        <div>{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                        <div className="text-sm">
                            {d.getDate()} {d.toLocaleDateString("en-US", { month: "short" })}
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}
