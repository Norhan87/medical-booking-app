function AppointmentCard({
  appointment,
  onEdit,
  onDelete,
}) {
  return (
    <div className="appointment-card">
      <h2>{appointment.doctorName}</h2>

      <p>
        <strong>Specialty:</strong>{" "}
        {appointment.specialty}
      </p>

      <p>
        <strong>Patient:</strong>{" "}
        {appointment.patientName}
      </p>

      <p>
        <strong>Date:</strong>{" "}
        {appointment.date}
      </p>

      <p>
        <strong>Time:</strong>{" "}
        {appointment.time}
      </p>

      {appointment.notes && (
        <p>
          <strong>Notes:</strong>{" "}
          {appointment.notes}
        </p>
      )}

      <div className="appointment-actions">
        <button
          onClick={() => onEdit(appointment)}
          className="btn-outline"
        >
          Edit Appointment
        </button>

        <button
          onClick={() => onDelete(appointment.id)}
          className="btn-danger"
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}

export default AppointmentCard;