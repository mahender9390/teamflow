import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaProjectDiagram,
  FaTasks,
  FaCheckCircle,
  FaHourglassHalf,
  FaSpinner,
  FaExclamationTriangle,
  FaUserCheck,
  FaBell,
} from "react-icons/fa";
import { getDashboard } from "../../api/dashboardApi";
import StatCard from "../../components/StatCard/StatCard";
import Loader from "../../components/Loader/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const response = await getDashboard();
      setStats(response.data);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!stats) {
    return <p className="text-secondary">No dashboard data available.</p>;
  }

  return (
    <div>
      <h4 className="page-title">Dashboard</h4>

      <div className="row">
        <StatCard
          title="Total Projects"
          value={stats.totalProjects}
          icon={<FaProjectDiagram />}
          color="primary"
        />
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={<FaTasks />}
          color="info"
        />
        <StatCard
          title="Completed Tasks"
          value={stats.completedTasks}
          icon={<FaCheckCircle />}
          color="success"
        />
        <StatCard
          title="Pending Tasks"
          value={stats.pendingTasks}
          icon={<FaHourglassHalf />}
          color="warning"
        />
      </div>

      <div className="row">
        <StatCard
          title="In Progress Tasks"
          value={stats.inProgressTasks}
          icon={<FaSpinner />}
          color="secondary"
        />
        <StatCard
          title="Overdue Tasks"
          value={stats.overdueTasks}
          icon={<FaExclamationTriangle />}
          color="danger"
        />
        <StatCard
          title="My Assigned Tasks"
          value={stats.myAssignedTasks}
          icon={<FaUserCheck />}
          color="dark"
        />
        <StatCard
          title="Unread Notifications"
          value={stats.unreadNotifications}
          icon={<FaBell />}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Dashboard;