export default function DoctorShortDetails({ doctor }) {
    return (
        <div>
            <div><strong>Name:</strong> <span>{doctor.name}</span></div>
            <div><strong>Specialization:</strong> <span>{doctor.specialization}</span></div>
            <div><strong>Education:</strong> <span>{doctor.education}</span></div>
        </div>
    );
}