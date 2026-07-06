import axiosInstance from "./axiosInstance";

export const getReviewsByRca = (rcaId) => {
  return axiosInstance.get(`/reviews/rca/${rcaId}`);
};

export const getReviewById = (id) => {
  return axiosInstance.get(`/reviews/${id}`);
};

export const createReview = (data) => {
  return axiosInstance.post("/reviews", data);
};

export const updateReview = (id, data) => {
  return axiosInstance.put(`/reviews/${id}`, data);
};

export const deleteReview = (id) => {
  return axiosInstance.delete(`/reviews/${id}`);
};