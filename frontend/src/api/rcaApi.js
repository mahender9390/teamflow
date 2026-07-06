import axiosInstance from "./axiosInstance";

export const getRcaById = (id) => {
  return axiosInstance.get(`/rca/${id}`);
};

export const getRcasByTask = (taskId) => {
  return axiosInstance.get(`/rca/task/${taskId}`);
};

export const createRca = (data) => {
  return axiosInstance.post("/rca", data);
};

export const updateRca = (id, data) => {
  return axiosInstance.put(`/rca/${id}`, data);
};

export const deleteRca = (id) => {
  return axiosInstance.delete(`/rca/${id}`);
};