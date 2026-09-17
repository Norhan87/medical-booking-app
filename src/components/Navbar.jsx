import { NavLink } from "react-router-dom";

function Navbar() {
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
      </div>
    </nav>
  );
}

export default Navbar;