import React from "react";
import { FaBell, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-light bg-white border-bottom px-3 py-2">
      <div className="d-flex justify-content-between align-items-center w-100">
        <span className="fw-semibold fs-5 text-primary">TeamFlow</span>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light position-relative"
            onClick={() => navigate("/notifications")}
            title="Notifications"
          >
            <FaBell />
          </button>

          <div className="d-flex align-items-center gap-2">
            <FaUserCircle size={22} className="text-secondary" />
            <span className="text-secondary small">{user?.email}</span>
          </div>

          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            <FaSignOutAlt className="me-1" />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;