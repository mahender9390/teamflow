import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { getTaskById } from "../../api/taskApi";
import {
    TASK_STATUS_COLORS,
    TASK_PRIORITY_COLORS,
} from "../../utils/constants";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import CommentsSection from "../../components/CommentsSection/CommentsSection";
import Loader from "../../components/Loader/Loader";
import RcaSection from "../../components/RcaSection/RcaSection";

const TaskDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchTask = async () => {
        setLoading(true);
        try {
            const response = await getTaskById(id);
            setTask(response.data);
        } catch (error) {
            toast.error("Failed to load task");
            navigate("/tasks");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTask();
    }, [id]);

    if (loading) {
        return <Loader />;
    }

    if (!task) {
        return null;
    }

    return (
        <div>
            <button
                className="btn btn-link text-decoration-none ps-0 mb-3"
                onClick={() => navigate("/tasks")}
            >
                <FaArrowLeft className="me-2" />
                Back to Tasks
            </button>

            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card border-0 shadow-sm h-100">
                        <div className="card-body">
                            <h5 className="fw-bold">{task.title}</h5>
                            <p className="text-secondary">{task.description}</p>

                            <div className="d-flex gap-2 mb-3">
                                <StatusBadge status={task.priority} colorMap={TASK_PRIORITY_COLORS} />
                                <StatusBadge status={task.status} colorMap={TASK_STATUS_COLORS} />
                            </div>

                            <table className="table table-borderless mb-0 small">
                                <tbody>
                                    <tr>
                                        <td className="text-secondary">Project</td>
                                        <td className="fw-semibold">{task.projectName}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-secondary">Due Date</td>
                                        <td className="fw-semibold">{task.dueDate}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-secondary">Assigned To</td>
                                        <td className="fw-semibold">{task.assignedUserName || "-"}</td>
                                    </tr>
                                    <tr>
                                        <td className="text-secondary">Created By</td>
                                        <td className="fw-semibold">{task.createdByName}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 mb-4 d-flex flex-column gap-4">
                    <CommentsSection taskId={task.id} />
                    <RcaSection taskId={task.id} />
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;