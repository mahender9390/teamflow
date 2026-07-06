import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaProjectDiagram,
  FaTasks,
  FaBell,
} from "react-icons/fa";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { to: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
  { to: "/tasks", label: "Tasks", icon: <FaTasks /> },
  { to: "/notifications", label: "Notifications", icon: <FaBell /> },
];

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3" style={{ width: "240px" }}>
      <h4 className="text-center mb-4">TeamFlow</h4>
      <ul className="nav nav-pills flex-column gap-1">
        {links.map((link) => (
          <li className="nav-item" key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                "nav-link d-flex align-items-center gap-2" + (isActive ? " active" : "")
              }
            >
              {link.icon}
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;