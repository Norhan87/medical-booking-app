import { NavLink } from "react-router-dom";
import useDoctorStore from "../stores/doctorStore";

function Navbar() {
  const { theme, toggleTheme } = useDoctorStore();

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link nav-link-active" : "nav-link";

  return (
    <nav className="navbar">
      <h2 className="navbar-logo">Medical Booking</h2>

      <div className="navbar-links">
        <NavLink to="/" end className={linkClass}>
          Doctors
        </NavLink>
        <NavLink to="/appointments" className={linkClass}>
          My Appointments
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          Profile
        </NavLink>

        <button onClick={toggleTheme} className="theme-button">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
