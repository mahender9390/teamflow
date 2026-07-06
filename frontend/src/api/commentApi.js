import axiosInstance from "./axiosInstance";

export const getCommentsByTask = (taskId) => {
  return axiosInstance.get(`/comments/task/${taskId}`);
};

export const createComment = (data) => {
  return axiosInstance.post("/comments", data);
};

export const deleteComment = (id) => {
  return axiosInstance.delete(`/comments/${id}`);
};