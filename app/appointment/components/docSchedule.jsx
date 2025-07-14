export default function DocSchedule({ selectedDate, dates, handleDateSelect }) {
    return (
        <>
            <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Doctor Schedules</h2>
            <div className="flex overflow-x-auto gap-2 px-1 scrollbar-hide">
                {dates.map((d, i) => (
                    <button
                        key={i}
                        className={`min-w-[80px] text-center p-2 rounded border text-sm ${selectedDate?.toDateString() === d.toDateString()
                                ? "bg-purple-600 text-white"
                                : "bg-white text-black"
                            }`}
                        onClick={() => handleDateSelect(d)}
                    >
                        <div>{d.toLocaleDateString("en-US", { weekday: "short" })}</div>
                        <div>
                            {d.getDate()} {d.toLocaleDateString("en-US", { month: "short" })}
                        </div>
                    </button>
                ))}
            </div>
        </>
    );
}
