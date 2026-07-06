import React, { useEffect, useState } from "react";
import { TASK_STATUS, TASK_PRIORITY } from "../../utils/constants";

const emptyForm = {
    title: "",
    description: "",
    priority: TASK_PRIORITY.MEDIUM,
    status: TASK_STATUS.TODO,
    dueDate: "",
    projectId: "",
    assignedUserId: "",
};

const TaskFormModal = ({ show, initialData, projects, users, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(emptyForm);

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || "",
                description: initialData.description || "",
                priority: initialData.priority || TASK_PRIORITY.MEDIUM,
                status: initialData.status || TASK_STATUS.TODO,
                dueDate: initialData.dueDate || "",
                projectId: initialData.projectId || "",
                assignedUserId: initialData.assignedUserId || "",
            });
        } else {
            setFormData(emptyForm);
        }
    }, [initialData, show]);

    if (!show) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            ...formData,
            projectId: Number(formData.projectId),
            assignedUserId: Number(formData.assignedUserId),
        });
    };

    return (
        <div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {initialData ? "Edit Task" : "Create Task"}
                            </h5>
                            <button type="button" className="btn-close" onClick={onCancel}></button>
                        </div>

                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    className="form-control"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    className="form-control"
                                    rows="3"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Priority</label>
                                    <select
                                        name="priority"
                                        className="form-select"
                                        value={formData.priority}
                                        onChange={handleChange}
                                    >
                                        {Object.values(TASK_PRIORITY).map((priority) => (
                                            <option key={priority} value={priority}>
                                                {priority}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Status</label>
                                    <select
                                        name="status"
                                        className="form-select"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        {Object.values(TASK_STATUS).map((status) => (
                                            <option key={status} value={status}>
                                                {status.replace(/_/g, " ")}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Due Date</label>
                                <input
                                    type="date"
                                    name="dueDate"
                                    className="form-control"
                                    value={formData.dueDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Project</label>
                                <select
                                    name="projectId"
                                    className="form-select"
                                    value={formData.projectId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a project</option>
                                    {projects.map((project) => (
                                        <option key={project.id} value={project.id}>
                                            {project.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Assigned User</label>

                                <select
                                    name="assignedUserId"
                                    className="form-select"
                                    value={formData.assignedUserId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select User</option>

                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.fullName} ({user.email})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {initialData ? "Update" : "Create"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskFormModal;