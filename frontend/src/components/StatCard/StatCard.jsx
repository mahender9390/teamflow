import React from "react";

const StatCard = ({ title, value, icon, color = "primary" }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-4">
      <div className={`card border-0 shadow-sm card-hover h-100`}>
        <div className="card-body d-flex align-items-center justify-content-between">
          <div>
            <p className="text-secondary mb-1 small">{title}</p>
            <h4 className="mb-0 fw-bold">{value}</h4>
          </div>
          <div
            className={`d-flex align-items-center justify-content-center rounded-circle bg-${color} bg-opacity-10 text-${color}`}
            style={{ width: "48px", height: "48px", fontSize: "20px" }}
          >
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;