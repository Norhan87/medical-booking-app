import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";
import Toast from "../components/Toast";
import AppointmentCard from "../components/AppointmentCard";

function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [message, setMessage] = useState("");
  const [editingDoctor, setEditingDoctor] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const today = new Date().toISOString().split("T")[0];

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

      setMessage("Appointment cancelled successfully!");
    } catch (error) {
      setMessage("Failed to cancel appointment.");
    }
  };

  const handleEdit = async (appointment) => {
    try {
      const response = await api.get(`/doctors/${appointment.doctorId}`);

      setEditingDoctor(response.data);
      setEditingAppointment(appointment);

      reset({
        patientName: appointment.patientName,
        patientEmail: appointment.patientEmail,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes || "",
      });
    } catch (error) {
      setMessage("Failed to load doctor information.");
    }
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
      setEditingDoctor(null);
      reset();

      setMessage("Appointment updated successfully!");
    } catch (error) {
      setMessage("Failed to update appointment.");
    }
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
    setEditingDoctor(null);
    reset();
  };

  if (loading) {
    return <p>Loading appointments...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
      <Toast message={message} onClose={() => setMessage("")} />

      <div className="appointments-page">
        <h1>My Appointments</h1>

        {editingAppointment && (
          <div className="edit-appointment-box">
            <h2>Edit Appointment</h2>

            <form
              onSubmit={handleSubmit(handleUpdate)}
              className="booking-form"
            >
              <div className="form-group">
                <label>Patient Name</label>

                <input
                  type="text"
                  {...register("patientName", {
                    required: "Patient name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
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
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
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
                  min={today}
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

                <select
                  {...register("time", {
                    required: "Please select a time",
                  })}
                >
                  <option value="">Select a time</option>

                  {editingDoctor?.slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>

                {errors.time && (
                  <p className="form-error">{errors.time.message}</p>
                )}
              </div>

              <div className="form-group">
                <label>Notes</label>

                <textarea {...register("notes")} />
              </div>

              <div className="edit-form-actions">
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Appointment"}
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
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default AppointmentsPage;
