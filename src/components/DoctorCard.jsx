import { Link } from "react-router-dom";

function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">
      <img src={doctor.image} alt={doctor.name} />

      <div className="doctor-card-content">
        <h2>{doctor.name}</h2>

        <p className="doctor-specialty">{doctor.specialty}</p>

        <p>{doctor.description}</p>

        <p>
          <strong>Working Days:</strong> {doctor.workingDays.join(", ")}
        </p>

        <Link to={`/doctors/${doctor.id}`}>View Details</Link>
      </div>
    </div>
  );
}

export default DoctorCard;
