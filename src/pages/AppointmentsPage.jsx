import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/appointments");
        setAppointments(response.data);
      } catch (error) {
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this appointment?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/appointments/${id}`);

      setAppointments((currentAppointments) =>
        currentAppointments.filter((appointment) => appointment.id !== id),
      );

      alert("Appointment cancelled successfully!");
    } catch (error) {
      alert("Failed to cancel appointment.");
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);

    reset({
      patientName: appointment.patientName,
      patientEmail: appointment.patientEmail,
      date: appointment.date,
      time: appointment.time,
      notes: appointment.notes || "",
    });
  };

  const handleUpdate = async (data) => {
    try {
      const updatedAppointment = {
        ...editingAppointment,
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        date: data.date,
        time: data.time,
        notes: data.notes,
      };

      const response = await api.put(
        `/appointments/${editingAppointment.id}`,
        updatedAppointment,
      );

      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment.id === editingAppointment.id
            ? response.data
            : appointment,
        ),
      );

      setEditingAppointment(null);

      alert("Appointment updated successfully!");
    } catch (error) {
      alert("Failed to update appointment.");
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    reset();
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="appointments-page">
      <h1>My Appointments</h1>

      {editingAppointment && (
        <div className="edit-appointment-box">
          <h2>Edit Appointment</h2>

          <form onSubmit={handleSubmit(handleUpdate)} className="booking-form">
            <div className="form-group">
              <label>Patient Name</label>

              <input
                type="text"
                {...register("patientName", {
                  required: "Patient name is required",
                })}
              />

              {errors.patientName && (
                <p className="form-error">{errors.patientName.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                {...register("patientEmail", {
                  required: "Email is required",
                })}
              />

              {errors.patientEmail && (
                <p className="form-error">{errors.patientEmail.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Date</label>

              <input
                type="date"
                {...register("date", {
                  required: "Date is required",
                })}
              />

              {errors.date && (
                <p className="form-error">{errors.date.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Time</label>

              <input
                type="text"
                {...register("time", {
                  required: "Time is required",
                })}
              />

              {errors.time && (
                <p className="form-error">{errors.time.message}</p>
              )}
            </div>

            <div className="form-group">
              <label>Notes</label>

              <textarea {...register("notes")} />
            </div>

            <div className="edit-form-actions">
              <button type="submit" className="btn-primary">
                Update Appointment
              </button>

              <button
                type="button"
                onClick={handleCancelEdit}
                className="btn-outline"
              >
                Cancel Edit
              </button>
            </div>
          </form>
        </div>
      )}

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-card">
              <h2>{appointment.doctorName}</h2>

              <p>
                <strong>Specialty:</strong> {appointment.specialty}
              </p>

              <p>
                <strong>Patient:</strong> {appointment.patientName}
              </p>

              <p>
                <strong>Date:</strong> {appointment.date}
              </p>

              <p>
                <strong>Time:</strong> {appointment.time}
              </p>

              {appointment.notes && (
                <p>
                  <strong>Notes:</strong> {appointment.notes}
                </p>
              )}

              <div className="appointment-actions">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="btn-outline"
                >
                  Edit Appointment
                </button>

                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="btn-danger"
                >
                  Cancel Appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
