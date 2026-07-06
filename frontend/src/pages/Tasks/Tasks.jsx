import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaSearch } from "react-icons/fa";
import {
    getAllTasks,
    getTasksByStatus,
    getTasksByPriority,
    searchTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../../api/taskApi";
import { getAllProjects } from "../../api/projectApi";
import {
    TASK_STATUS,
    TASK_STATUS_COLORS,
    TASK_PRIORITY,
    TASK_PRIORITY_COLORS,
} from "../../utils/constants";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import Pagination from "../../components/Pagination/Pagination";
import Loader from "../../components/Loader/Loader";
import TaskFormModal from "./TaskFormModal";
import { getAllUsers } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const PAGE_SIZE = 8;

const Tasks = () => {
    const [pageData, setPageData] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [keyword, setKeyword] = useState("");
    const [users, setUsers] = useState([]);


    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const navigate = useNavigate();

    const fetchProjects = async () => {
        try {
            const response = await getAllProjects();
            setProjects(response.data);
        } catch (error) {
            toast.error("Failed to load projects");
        }
    };

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const params = { page, size: PAGE_SIZE, sort: "dueDate,asc" };
            let response;

            if (keyword.trim()) {
                response = await searchTasks(keyword.trim(), params);
            } else if (statusFilter) {
                response = await getTasksByStatus(statusFilter, params);
            } else if (priorityFilter) {
                response = await getTasksByPriority(priorityFilter, params);
            } else {
                response = await getAllTasks(params);
            }

            setPageData(response.data);
        } catch (error) {
            toast.error("Failed to load tasks");
        } finally {
            setLoading(false);
        }
    }, [page, statusFilter, priorityFilter, keyword]);

    useEffect(() => {
        fetchProjects();
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleStatusFilterChange = (value) => {
        setStatusFilter(value);
        setPriorityFilter("");
        setKeyword("");
        setPage(0);
    };

    const handlePriorityFilterChange = (value) => {
        setPriorityFilter(value);
        setStatusFilter("");
        setKeyword("");
        setPage(0);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setStatusFilter("");
        setPriorityFilter("");
        setPage(0);
        fetchTasks();
    };

    const handleCreateClick = () => {
        setEditingTask(null);
        setShowForm(true);
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingTask) {
                await updateTask(editingTask.id, formData);
                toast.success("Task updated successfully");
            } else {
                await createTask(formData);
                toast.success("Task created successfully");
            }
            setShowForm(false);
            fetchTasks();
        } catch (error) {
            const message = error.response?.data?.message || "Operation failed";
            toast.error(message);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteTask(deleteTarget.id);
            toast.success("Task deleted successfully");
            setDeleteTarget(null);
            fetchTasks();
        } catch (error) {
            const message = error.response?.data?.message || "Delete failed";
            toast.error(message);
        }
    };

    const fetchUsers = async () => {

        try {

            const response = await getAllUsers();

            setUsers(response.data);

        } catch {

            toast.error("Failed to load users");

        }

    };

    const tasks = pageData?.content || [];

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="page-title mb-0">Tasks</h4>
                <button className="btn btn-primary btn-sm" onClick={handleCreateClick}>
                    <FaPlus className="me-1" /> New Task
                </button>
            </div>

            <div className="card border-0 shadow-sm mb-3">
                <div className="card-body">
                    <div className="row g-2 align-items-end">
                        <div className="col-md-4">
                            <form onSubmit={handleSearchSubmit} className="d-flex gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by title..."
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button type="submit" className="btn btn-outline-secondary">
                                    <FaSearch />
                                </button>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => handleStatusFilterChange(e.target.value)}
                            >
                                <option value="">Filter by status</option>
                                {Object.values(TASK_STATUS).map((status) => (
                                    <option key={status} value={status}>
                                        {status.replace(/_/g, " ")}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="col-md-4">
                            <select
                                className="form-select"
                                value={priorityFilter}
                                onChange={(e) => handlePriorityFilterChange(e.target.value)}
                            >
                                <option value="">Filter by priority</option>
                                {Object.values(TASK_PRIORITY).map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="table-responsive">
                        <table className="table table-hover bg-white shadow-sm rounded">
                            <thead className="table-light">
                                <tr>
                                    <th>Title</th>
                                    <th>Project</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Due Date</th>
                                    <th>Assigned To</th>
                                    <th>Created By</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center text-secondary py-4">
                                            No tasks found.
                                        </td>
                                    </tr>
                                ) : (
                                    tasks.map((task) => (
                                        <tr key={task.id}>
                                            <td className="fw-semibold">{task.title}</td>
                                            <td>{task.projectName}</td>
                                            <td>
                                                <StatusBadge
                                                    status={task.priority}
                                                    colorMap={TASK_PRIORITY_COLORS}
                                                />
                                            </td>
                                            <td>
                                                <StatusBadge
                                                    status={task.status}
                                                    colorMap={TASK_STATUS_COLORS}
                                                />
                                            </td>
                                            <td>{task.dueDate}</td>
                                            <td>{task.assignedUserName || "-"}</td>
                                            <td>{task.createdByName}</td>
                                            <td className="text-end">

                                                <button
                                                    className="btn btn-sm btn-outline-secondary me-2"
                                                    onClick={() => navigate(`/tasks/${task.id}`)}
                                                >
                                                    <FaEye />
                                                </button>

                                                <button
                                                    className="btn btn-sm btn-outline-primary me-2"
                                                    onClick={() => handleEditClick(task)}
                                                >
                                                    <FaEdit />
                                                </button>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => setDeleteTarget(task)}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <Pagination pageData={pageData} onPageChange={setPage} />
                </>
            )}

            <TaskFormModal
                show={showForm}
                initialData={editingTask}
                projects={projects}
                users={users}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
            />

            <ConfirmModal
                show={!!deleteTarget}
                title="Delete Task"
                message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
};

export default Tasks;