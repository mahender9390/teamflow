import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash, FaPaperPlane } from "react-icons/fa";
import {
    getCommentsByTask,
    createComment,
    deleteComment,
} from "../../api/commentApi";
import { useAuth } from "../../context/AuthContext";
import Loader from "../Loader/Loader";

const CommentsSection = ({ taskId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const response = await getCommentsByTask(taskId);
            setComments(response.data);
        } catch (error) {
            toast.error("Failed to load comments");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (taskId) {
            fetchComments();
        }
    }, [taskId]);

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        setSubmitting(true);
        try {
            await createComment({ taskId, comment: text.trim() });
            setText("");
            fetchComments();
        } catch (error) {
            const message = error.response?.data?.message || "Failed to add comment";
            toast.error(message);
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteComment(id);
            toast.success("Comment deleted");
            fetchComments();
        } catch (error) {
            const message = error.response?.data?.message || "Delete failed";
            toast.error(message);
        }
    };

    return (
        <div className="card border-0 shadow-sm">
            <div className="card-header bg-white fw-semibold">Comments</div>

            <div className="card-body" style={{ maxHeight: "320px", overflowY: "auto" }}>
                {loading ? (
                    <Loader />
                ) : comments.length === 0 ? (
                    <p className="text-secondary small mb-0">No comments yet.</p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="d-flex justify-content-between align-items-start border-bottom pb-2 mb-2"
                        >
                            <div>
                                <p className="mb-1 small fw-semibold">{comment.userName}</p>
                                <p className="mb-1">{comment.comment}</p>
                                <p className="mb-0 text-secondary" style={{ fontSize: "0.75rem" }}>
                                    {new Date(comment.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <button
                                className="btn btn-sm btn-link text-danger"
                                onClick={() => handleDelete(comment.id)}
                                title="Delete comment"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="card-footer bg-white">
                <form onSubmit={handleAddComment} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write a comment..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting || !text.trim()}
                    >
                        <FaPaperPlane />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CommentsSection;