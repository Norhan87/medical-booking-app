import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";

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
    formState: { errors },
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

      alert("Appointment booked successfully!");

      navigate("/appointments");
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
    <div className="booking-form-page">
      <h1>Book Appointment</h1>

      <div className="doctor-mini-info">
        <h2>{doctor.name}</h2>
        <p>{doctor.specialty}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="booking-form">
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

          {errors.date && <p className="form-error">{errors.date.message}</p>}
        </div>

        <div className="form-group">
          <label>Time</label>

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

          {errors.time && <p className="form-error">{errors.time.message}</p>}
        </div>

        <div className="form-group">
          <label>Notes</label>

          <textarea {...register("notes")} />
        </div>

        <button type="submit" className="btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointmentPage;
