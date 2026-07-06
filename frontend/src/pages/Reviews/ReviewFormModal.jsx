import React, { useEffect, useState } from "react";
import { REVIEW_STATUS } from "../../utils/constants";

const emptyForm = {
  status: REVIEW_STATUS.PENDING,
  comments: "",
};

const ReviewFormModal = ({ show, initialData, isEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        status: initialData.status || REVIEW_STATUS.PENDING,
        comments: initialData.comments || "",
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
    onSubmit(formData);
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
                {isEdit ? "Edit Review" : "Add Review"}
              </h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>

            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Decision</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  {Object.values(REVIEW_STATUS).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Comments</label>
                <textarea
                  name="comments"
                  className="form-control"
                  rows="3"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Reasoning for this decision..."
                ></textarea>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                {isEdit ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;