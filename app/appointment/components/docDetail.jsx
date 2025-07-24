export default function DocDetails({ doctor }) {
    // Extracting doctor details
    const { firstName, lastName, specialization, education, experience, bio, profileImage, availableSlots, reviews } = doctor;
    const averageRating = Math.round(
        doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length
    );

    return (
        <div className="w-full max-w-4xl mx-auto p-0 sm:p-6 bg-white  rounded-xl font-sans">
  {/* Doctor Image */}
  <div className="flex justify-center mb-4 sm:mb-6">
    <img
      src="/dp/default.jpg"
      alt={`${firstName} ${lastName}`}
      className="w-28 h-28 sm:w-36 sm:h-36 object-cover rounded-full border-4 border-blue-600 shadow-md"
    />
  </div>

  {/* Doctor Name & Rating */}
  <div className="text-center">
    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
      Dr. {firstName} {lastName}
    </h1>

    {/* Star Rating */}
    <div className="flex justify-center mt-1 space-x-0.5 sm:space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill="#facc15"
          viewBox="0 0 24 24"
          className="w-4 h-4 sm:w-5 sm:h-5"
        >
          <path d="M11.48 3.5l2.2 4.45 4.9.71-3.55 3.47.84 4.89-4.39-2.31-4.39 2.31.84-4.89-3.55-3.47 4.91-.71L11.48 3.5z" />
        </svg>
      ))}
    </div>
  </div>

  {/* Doctor Info */}
  <div className="mt-5 space-y-2 text-sm sm:text-[15px] text-gray-700">
    <p>
      <span className="font-semibold text-gray-800">Specialization:</span>{" "}
      {specialization?.join(", ")}
    </p>
    <p>
      <span className="font-semibold text-gray-800">Education:</span> {education}
    </p>
    <p>
      <span className="font-semibold text-gray-800">Experience:</span> {experience} years
    </p>
    <p>
      <span className="font-semibold text-gray-800">Bio:</span> {bio}
    </p>
  </div>

  {/* Available Slots */}
  <div className="mt-6">
    <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Available Slots</h2>
    {availableSlots?.length > 0 ? (
      availableSlots.map((slot, index) => (
        <div key={index} className="mb-3">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800">{slot.day}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {slot.slots.map((time, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm"
              >
                {time.start} - {time.end}
              </span>
            ))}
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-600 text-sm">No available slots.</p>
    )}
  </div>

  {/* Reviews */}
  <div className="mt-6">
    <h2 className="text-lg sm:text-xl font-bold text-blue-700 mb-2">Reviews</h2>
    {reviews?.length > 0 ? (
      reviews.map((review, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-2"
        >
          <p className="text-gray-700 text-sm">{review}</p>
        </div>
      ))
    ) : (
      <p className="text-gray-600 text-sm">No reviews yet.</p>
    )}
  </div>
</div>


    );
}
