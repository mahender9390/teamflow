import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash, FaClipboardCheck } from "react-icons/fa";
import {
    getReviewsByRca,
    createReview,
    updateReview,
    deleteReview,
} from "../../api/reviewApi";
import { REVIEW_STATUS_COLORS } from "../../utils/constants";
import { useAuth } from "../../context/AuthContext";
import StatusBadge from "../StatusBadge/StatusBadge";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Loader from "../Loader/Loader";
import ReviewFormModal from "../../pages/Reviews/ReviewFormModal";

const ReviewList = ({ rcaId }) => {
    const { user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingReview, setEditingReview] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const fetchReviews = async () => {
        setLoading(true);
        try {
            const response = await getReviewsByRca(rcaId);
            setReviews(response.data);
        } catch (error) {
            toast.error("Failed to load reviews");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (expanded) {
            fetchReviews();
        }
    }, [expanded, rcaId]);

    const handleCreateClick = () => {
        setEditingReview(null);
        setShowForm(true);
    };

    const handleEditClick = (review) => {
        setEditingReview(review);
        setShowForm(true);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingReview) {
                await updateReview(editingReview.id, formData);
                toast.success("Review updated successfully");
            } else {
                await createReview({ ...formData, rcaId });
                toast.success("Review submitted successfully");
            }
            setShowForm(false);
            fetchReviews();
        } catch (error) {
            const message = error.response?.data?.message || "Operation failed";
            toast.error(message);
        }
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteReview(deleteTarget.id);
            toast.success("Review deleted successfully");
            setDeleteTarget(null);
            fetchReviews();
        } catch (error) {
            const message = error.response?.data?.message || "Delete failed";
            toast.error(message);
        }
    };

    return (
        <div className="mt-2 border-top pt-2">
            <button
                className="btn btn-sm btn-link p-0 text-decoration-none d-flex align-items-center gap-1"
                onClick={() => setExpanded((prev) => !prev)}
            >
                <FaClipboardCheck />
                {expanded ? "Hide Reviews" : "Show Reviews"}
            </button>

            {expanded && (
                <div className="mt-2">
                    <div className="d-flex justify-content-end mb-2">
                        <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={handleCreateClick}
                        >
                            <FaPlus className="me-1" /> Add Review
                        </button>
                    </div>

                    {loading ? (
                        <Loader />
                    ) : reviews.length === 0 ? (
                        <p className="text-secondary small mb-0">No reviews yet.</p>
                    ) : (
                        reviews.map((review) => (
                            <div
                                key={review.id}
                                className="d-flex justify-content-between align-items-start bg-light rounded p-2 mb-2"
                            >
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <span className="fw-semibold small">{review.reviewerName}</span>
                                        <StatusBadge
                                            status={review.status}
                                            colorMap={REVIEW_STATUS_COLORS}
                                        />
                                    </div>
                                    {review.comments && (
                                        <p className="mb-1 small">{review.comments}</p>
                                    )}
                                    <p className="mb-0 text-secondary" style={{ fontSize: "0.7rem" }}>
                                        {new Date(review.reviewedAt).toLocaleString()}
                                    </p>
                                </div>

                                <div className="d-flex gap-2">
                                    <button
                                        className="btn btn-sm btn-link p-0 text-primary"
                                        onClick={() => handleEditClick(review)}
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        className="btn btn-sm btn-link p-0 text-danger"
                                        onClick={() => setDeleteTarget(review)}
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            <ReviewFormModal
                show={showForm}
                initialData={editingReview}
                isEdit={!!editingReview}
                onSubmit={handleFormSubmit}
                onCancel={() => setShowForm(false)}
            />

            <ConfirmModal
                show={!!deleteTarget}
                title="Delete Review"
                message="Are you sure you want to delete this review?"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />
        </div>
    );
};

export default ReviewList;