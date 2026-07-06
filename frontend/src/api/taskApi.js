import axiosInstance from "./axiosInstance";

export const getAllTasks = (params) => {
  return axiosInstance.get("/tasks", { params });
};

export const getTasksByProject = (projectId) => {
  return axiosInstance.get(`/tasks/project/${projectId}`);
};

export const getTaskById = (id) => {
  return axiosInstance.get(`/tasks/${id}`);
};

export const getTasksByStatus = (status, params) => {
  return axiosInstance.get(`/tasks/status/${status}`, { params });
};

export const getTasksByPriority = (priority, params) => {
  return axiosInstance.get(`/tasks/priority/${priority}`, { params });
};

export const searchTasks = (keyword, params) => {
  return axiosInstance.get("/tasks/search", { params: { keyword, ...params } });
};

export const createTask = (data) => {
  return axiosInstance.post("/tasks", data);
};

export const updateTask = (id, data) => {
  return axiosInstance.put(`/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return axiosInstance.delete(`/tasks/${id}`);
};