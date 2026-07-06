import axiosInstance from "./axiosInstance";

export const getMyNotifications = () => {
  return axiosInstance.get("/notifications");
};

export const markNotificationAsRead = (id) => {
  return axiosInstance.put(`/notifications/${id}/read`);
};

export const deleteNotification = (id) => {
  return axiosInstance.delete(`/notifications/${id}`);
};