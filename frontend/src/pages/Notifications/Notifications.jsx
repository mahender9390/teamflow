import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCheck, FaTrash, FaBell, FaRegBell } from "react-icons/fa";
import {
  getMyNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../../api/notificationApi";
import { NOTIFICATION_TYPE_COLORS } from "../../utils/constants";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Loader from "../../components/Loader/Loader";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const response = await getMyNotifications();
      setNotifications(response.data);
    } catch (error) {
      toast.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteNotification(deleteTarget.id);
      toast.success("Notification deleted");
      setDeleteTarget(null);
      fetchNotifications();
    } catch (error) {
      toast.error("Delete failed");
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "UNREAD") return !n.read;
    if (filter === "READ") return n.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="page-title mb-0">
          Notifications{" "}
          {unreadCount > 0 && (
            <span className="badge bg-danger ms-2">{unreadCount} unread</span>
          )}
        </h4>

        <select
          className="form-select form-select-sm"
          style={{ width: "160px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="ALL">All</option>
          <option value="UNREAD">Unread</option>
          <option value="READ">Read</option>
        </select>
      </div>

      {loading ? (
        <Loader />
      ) : filteredNotifications.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center text-secondary py-5">
            <FaRegBell size={32} className="mb-2" />
            <p className="mb-0">No notifications found.</p>
          </div>
        </div>
      ) : (
        <div className="list-group shadow-sm">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`list-group-item d-flex justify-content-between align-items-start ${
                !notification.read ? "bg-light" : ""
              }`}
            >
              <div className="d-flex gap-3">
                <div
                  className={`d-flex align-items-center justify-content-center rounded-circle bg-${
                    NOTIFICATION_TYPE_COLORS[notification.type] || "secondary"
                  } bg-opacity-10 text-${
                    NOTIFICATION_TYPE_COLORS[notification.type] || "secondary"
                  }`}
                  style={{ width: "40px", height: "40px", flexShrink: 0 }}
                >
                  <FaBell />
                </div>

                <div>
                  <div className="d-flex align-items-center gap-2 mb-1">
                    <p className="fw-semibold mb-0">{notification.title}</p>
                    <StatusBadge
                      status={notification.type}
                      colorMap={NOTIFICATION_TYPE_COLORS}
                    />
                    {!notification.read && (
                      <span
                        className="bg-primary rounded-circle"
                        style={{ width: "8px", height: "8px" }}
                      ></span>
                    )}
                  </div>
                  <p className="mb-1">{notification.message}</p>
                  <p className="text-secondary mb-0" style={{ fontSize: "0.75rem" }}>
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="d-flex gap-2">
                {!notification.read && (
                  <button
                    className="btn btn-sm btn-outline-success"
                    title="Mark as read"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <FaCheck />
                  </button>
                )}
                <button
                  className="btn btn-sm btn-outline-danger"
                  title="Delete"
                  onClick={() => setDeleteTarget(notification)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal
        show={!!deleteTarget}
        title="Delete Notification"
        message="Are you sure you want to delete this notification?"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Notifications;