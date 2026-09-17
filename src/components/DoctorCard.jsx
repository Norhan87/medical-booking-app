import { Link } from "react-router-dom";
import useDoctorStore from "../stores/doctorStore";

function DoctorCard({ doctor }) {
  const { favorites, toggleFavorite } = useDoctorStore();

  const isFavorite = favorites.some((favorite) => favorite.id === doctor.id);

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

        <div className="doctor-card-actions">
          <Link to={`/doctors/${doctor.id}`} className="btn-primary">
            View Details
          </Link>

          <button
            className={`btn-favorite-icon ${isFavorite ? "active" : ""}`}
            onClick={() => toggleFavorite(doctor)}
            aria-label="Toggle favorite"
          >
            {isFavorite ? "❤️" : "♡"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorCard;
