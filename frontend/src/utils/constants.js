export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const TOKEN_KEY = "teamflow_token";
export const USER_KEY = "teamflow_user";

export const ROLES = {
  ADMIN: "ADMIN",
  MANAGER: "MANAGER",
  DEVELOPER: "DEVELOPER",
  TESTER: "TESTER",
};

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  TASKS: "/tasks",
  RCA: "/rca",
  REVIEWS: "/reviews",
  NOTIFICATIONS: "/notifications"
};

export const PROJECT_STATUS = {
  PLANNING: "PLANNING",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
  ON_HOLD: "ON_HOLD",
};

export const PROJECT_STATUS_COLORS = {
  PLANNING: "secondary",
  IN_PROGRESS: "primary",
  COMPLETED: "success",
  ON_HOLD: "warning",
};

export const TASK_STATUS = {
  TODO: "TODO",
  IN_PROGRESS: "IN_PROGRESS",
  IN_REVIEW: "IN_REVIEW",
  DONE: "DONE",
};

export const TASK_STATUS_COLORS = {
  TODO: "secondary",
  IN_PROGRESS: "primary",
  IN_REVIEW: "warning",
  DONE: "success",
};

export const TASK_PRIORITY = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  CRITICAL: "CRITICAL",
};

export const TASK_PRIORITY_COLORS = {
  LOW: "secondary",
  MEDIUM: "info",
  HIGH: "warning",
  CRITICAL: "danger",
};

export const NOTIFICATION_TYPE_COLORS = {
  TASK_ASSIGNED: "primary",
  TASK_UPDATED: "info",
  COMMENT_ADDED: "secondary",
  PROJECT_UPDATED: "warning",
};