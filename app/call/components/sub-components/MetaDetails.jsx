export default function MetaDetails({ appointment }) {
  return (
    <div>
        <div><strong>Appointment: </strong>{appointment._id}</div>
        <div><strong>Date: </strong>{appointment.date}</div>
        <div><strong>Time: </strong>{appointment.interval.start} - {appointment.interval.end}</div>
        <div><strong>Patient Phone: </strong>{appointment.phone}</div>
    </div>
  );
}