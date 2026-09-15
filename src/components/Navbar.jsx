import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Medical Booking</h2>

      <div>
        <Link to="/">Doctors</Link>
        <Link to="/appointments">My Appointments</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;