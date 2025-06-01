export default function MetaDetails({ appointment }) {
  return (
    <div className="text-gray-800">
        <div><strong>Appointment: </strong>{appointment._id}</div>
        <div><strong>Date: </strong>{appointment.date}</div>
        <div><strong>Time: </strong>{appointment.interval.start} - {appointment.interval.end}</div>
        <div><strong>Patient Phone: </strong>{appointment.phone}</div>
    </div>
  );
}