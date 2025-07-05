export default function DoctorShortDetails({ doctor }) {
    return (
        <div className="text-gray-800">
            <h2 className="text-2xl font-semibold">
                Dr. {doctor.name}
            </h2>
            <div><strong>Specialization:</strong> <span>{doctor.specialization}</span></div>
            <div><strong>Education:</strong> <span>{doctor.education}</span></div>
        </div>
    );
}