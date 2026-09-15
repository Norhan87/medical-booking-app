import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

function DoctorDetailsPage() {
  const { id } = useParams();

  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await api.get(`/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        setError("Doctor not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return <p>Loading doctor details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="doctor-details-page">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="doctor-details-img"
      />

      <div className="doctor-details-content">
        <h1>{doctor.name}</h1>

        <span className="doctor-specialty">{doctor.specialty}</span>

        <p>{doctor.description}</p>

        <p>
          <strong>Working Days:</strong> {doctor.workingDays.join(", ")}
        </p>

        <p>
          <strong>Available Slots:</strong> {doctor.slots.join(", ")}
        </p>

        <Link to={`/book?doctorId=${doctor.id}`} className="btn-primary">
          Book Appointment
        </Link>
      </div>
    </div>
  );
}

export default DoctorDetailsPage;
