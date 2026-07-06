import React from "react";

const StatusBadge = ({ status, colorMap = {}, defaultColor = "secondary" }) => {
  const color = colorMap[status] || defaultColor;

  return (
    <span className={`badge bg-${color}-subtle text-${color} border border-${color}`}>
      {status?.replace(/_/g, " ")}
    </span>
  );
};

export default StatusBadge;