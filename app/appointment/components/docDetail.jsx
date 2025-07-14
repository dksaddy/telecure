export default function DocDetails({ doctor }) {
    // Extracting doctor details
    const { firstName, lastName, specialization, education, experience, bio, profileImage, availableSlots, reviews } = doctor;
    const averageRating = Math.round(
        doctor.reviews.reduce((sum, r) => sum + r.rating, 0) / doctor.reviews.length
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Doctor Profile Image*/}
            <div className="flex justify-center mb-6">
                <img src={"../dp/default.jpg"} alt={`${firstName} ${lastName}`} className="w-40 h-40 rounded-full border-4 border-blue-500" />
            </div>

            {/* Doctor Name */}
            <h1 className="text-3xl font-semibold text-center">{firstName} {lastName}</h1>

            {/* Static 5 Star Rating (Gray) */}
            <div className="flex items-center space-x-1 text-yellow-500 justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="#d1d5db" // gray color
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.48 3.499l2.196 4.446 4.907.714-3.552 3.464.839 4.89-4.39-2.307-4.39 2.307.84-4.89-3.553-3.464 4.908-.714L11.48 3.5z"
                        />
                    </svg>
                ))}
            </div>

            {/* Specialization */}
            <p className="mt-4 text-lg text-gray-700">
                <strong>Specialization:</strong> {specialization.join(', ')}
            </p>

            {/* Education */}
            <p className="mt-2 text-lg text-gray-700">
                <strong>Education:</strong> {education}
            </p>

            {/* Experience */}
            <p className="mt-2 text-lg text-gray-700">
                <strong>Experience:</strong> {experience} years
            </p>

            {/* Bio */}
            <p className="mt-4 text-lg text-gray-700">
                <strong>Bio:</strong> {bio}
            </p>

            {/* Available Slots */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">Available Slots</h2>
                {availableSlots.length > 0 ? (
                    availableSlots.map((slot, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="text-xl font-medium text-gray-700">{slot.day}</h3>
                            {slot.slots.map((time, idx) => (
                                <p key={idx} className="text-lg text-gray-600">
                                    {time.start} - {time.end}
                                </p>
                            ))}
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-600">No available slots</p>
                )}
            </div>

            {/* Ratings & Reviews */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
                {reviews.length > 0 ? (
                    reviews.map((review, index) => (
                        <div key={index} className="mt-2 bg-gray-100 p-4 rounded-lg">
                            <p className="text-lg text-gray-700">{review}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-lg text-gray-600">No reviews yet.</p>
                )}
            </div>
        </div>
    );
}
