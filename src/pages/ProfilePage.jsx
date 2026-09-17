import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import useDoctorStore from "../stores/doctorStore";

function ProfilePage() {
  const { favorites, toggleFavorite } = useDoctorStore();

  const nameRef = useRef(null);
  const [profileName, setProfileName] = useState("");

  const handleSaveName = () => {
    const name = nameRef.current.value.trim();

    if (!name) {
      return;
    }

    setProfileName(name);
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>

      <div className="profile-settings-card">
        <h2>Profile Settings</h2>

        <div className="profile-name-row">
          <input type="text" ref={nameRef} placeholder="Enter your name" />
          <button onClick={handleSaveName} className="btn-primary">
            Save Name
          </button>
        </div>

        {profileName && (
          <p className="profile-welcome">Welcome, {profileName}! 👋</p>
        )}
      </div>

      <div className="favorites-card">
        <h2>Favorite Doctors</h2>

        {favorites.length === 0 ? (
          <p className="empty-state">No favorite doctors yet.</p>
        ) : (
          <div className="favorites-list">
            {favorites.map((doctor) => (
              <div key={doctor.id} className="favorite-item">
                <img src={doctor.image} alt={doctor.name} />

                <div className="favorite-item-info">
                  <h3>{doctor.name}</h3>
                  <p>{doctor.specialty}</p>
                </div>

                <div className="favorite-item-actions">
                  <Link to={`/doctors/${doctor.id}`} className="btn-outline">
                    View Details
                  </Link>
                  <button
                    onClick={() => toggleFavorite(doctor)}
                    className="btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
