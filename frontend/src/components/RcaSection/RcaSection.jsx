import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaExclamationTriangle } from "react-icons/fa";
import {
    getRcasByTask,
    createRca,
    updateRca,
    deleteRca,
} from "../../api/rcaApi";
import { RCA_SEVERITY_COLORS, RCA_STATUS_COLORS } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../StatusBadge/StatusBadge";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Loader from "../Loader/Loader";
import RcaFormModal from "../../pages/Rca/RcaFormModal";
import ReviewList from "../ReviewList/ReviewList";

const RcaSection = ({ taskId }) => {
    const { user } = useAuth();
    const [rcas, setRcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingRca, setEditingRca] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchRcas = async () => {
        setLoading(true);
        try {
            const response = await getRcasByTask(taskId);
            setRcas(response.data);
        } catch (error) {
            toast.error("Failed to load RCAs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (taskId) {
            fetchRcas();
        }
    }, [taskId]);

    const handleCreateClick = () => {
        setEditingRca(null);
        setShowForm(true);
    };

    const handleEditClick = (rca) => {
        setEditingRca(rca);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingRca) {
                await updateRca(editingRca.id, formData);
                toast.success("RCA updated successfully");
            } else {
                await createRca({ ...formData, taskId });
                toast.success("RCA reported successfully");
            }
            setShowForm(false);
            fetchRcas();
        } catch (error) {
            const message = error.response?.data?.message || "Operation failed";
            toast.error(message);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteRca(deleteTarget.id);
            toast.success("RCA deleted successfully");
            setDeleteTarget(null);
            fetchRcas();
        } catch (error) {
            const message = error.response?.data?.message || "Delete failed";
            toast.error(message);
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Root Cause Analysis</span>
                <button className="btn btn-sm btn-outline-primary" onClick={handleCreateClick}>
                    <FaPlus className="me-1" /> Report RCA
                </button>
            </div>

            <div className="card-body" style={{ maxHeight: "400px", overflowY: "auto" }}>
                {loading ? (
                    <Loader />
                ) : rcas.length === 0 ? (
                    <p className="text-secondary small mb-0 text-center py-3">
                        <FaExclamationTriangle className="me-1" />
                        No RCA reported for this task.
                    </p>
                ) : (
                    rcas.map((rca) => (
                        <div key={rca.id} className="border rounded p-3 mb-3">
                            <div className="d-flex justify-content-between align-items-start">
                                <h6 className="fw-bold mb-1">{rca.title}</h6>
                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm btn-link p-0 text-primary"
                                        onClick={() => handleEditClick(rca)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-link p-0 text-danger"
                                        onClick={() => setDeleteTarget(rca)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex gap-2 mb-2">
                                <StatusBadge status={rca.severity} colorMap={RCA_SEVERITY_COLORS} />
                                <StatusBadge status={rca.status} colorMap={RCA_STATUS_COLORS} />
                            </div>

                            {rca.description && (
                                <p className="mb-2 small text-secondary">{rca.description}</p>
                            )}

                            {rca.rootCause && (
                                <p className="mb-1 small">
                                    <span className="fw-semibold">Root Cause: </span>
                                    {rca.rootCause}
                                </p>
                            )}

                            {rca.resolution && (
                                <p className="mb-1 small">
                                    <span className="fw-semibold">Resolution: </span>
                                    {rca.resolution}
                                </p>
                            )}

                            <p className="mb-0 text-secondary" style={{ fontSize: "0.75rem" }}>
                                Reported by {rca.reportedByName} on{" "}
                                {new Date(rca.createdAt).toLocaleString()}
                            </p>

                            <ReviewList rcaId={rca.id} />
                        </div>
                    ))
                )}
            </div>

            <RcaFormModal
                show={showForm}
                initialData={editingRca}
                isEdit={!!editingRca}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
            />

            <ConfirmModal
                show={!!deleteTarget}
                title="Delete RCA"
                message={`Are you sure you want to delete "${deleteTarget?.title}"?`}
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
};

export default RcaSection;