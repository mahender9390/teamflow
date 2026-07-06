import axiosInstance from "./axiosInstance";

export const getAllUsers = () => {
    return axiosInstance.get("/users");
};