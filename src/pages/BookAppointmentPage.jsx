import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import Toast from "../components/Toast";

function BookAppointmentPage() {
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("doctorId");

  const navigate = useNavigate();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${doctorId}`);
        setDoctor(response.data);
      } catch (error) {
        setMessage("Failed to load doctor information.");
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctor();
    } else {
      setLoading(false);
      setMessage("No doctor selected.");
    }
  }, [doctorId]);

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data) => {
    try {
      const appointment = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        patientName: data.patientName,
        patientEmail: data.patientEmail,
        date: data.date,
        time: data.time,
        notes: data.notes,
      };

      await api.post("/appointments", appointment);
      setMessage("Appointment booked successfully!");

      setTimeout(() => {
        navigate("/appointments");
      }, 1000);
    } catch (error) {
      setMessage("Failed to book appointment.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!doctor) {
    return <p>{message}</p>;
  }

  return (
    <>
    <Toast
      message={message}
      onClose={() => setMessage("")}
    />
    <div className="booking-form-page">
      <h1>Book Appointment</h1>

      <div className="booking-layout">
        <div className="doctor-summary-card">
          <img src={doctor.image} alt={doctor.name} />
          <h2>{doctor.name}</h2>
          <span className="doctor-specialty">{doctor.specialty}</span>
          <p className="summary-note">
            Please fill in your details and choose your preferred date and time.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
          <div className="form-group">
            <label>👤 Patient Name</label>

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
            <label>📧 Email</label>

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

          <div className="form-row">
            <div className="form-group">
              <label>📅 Date</label>

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
              <label>🕐 Time</label>

              <select
                {...register("time", {
                  required: "Please select a time",
                })}
              >
                <option value="">Select a time</option>

                {doctor.slots.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>

              {errors.time && (
                <p className="form-error">{errors.time.message}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>📝 Notes (optional)</label>

            <textarea
              {...register("notes")}
              placeholder="Any additional details..."
            />
          </div>

          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default BookAppointmentPage;
