import React, { useEffect, useState } from "react";
import { RCA_SEVERITY, RCA_STATUS } from "../../utils/constants";

const emptyForm = {
  title: "",
  description: "",
  severity: RCA_SEVERITY.MEDIUM,
  status: RCA_STATUS.OPEN,
  rootCause: "",
  resolution: "",
};

const RcaFormModal = ({ show, initialData, isEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        severity: initialData.severity || RCA_SEVERITY.MEDIUM,
        status: initialData.status || RCA_STATUS.OPEN,
        rootCause: initialData.rootCause || "",
        resolution: initialData.resolution || "",
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
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {isEdit ? "Edit RCA" : "Report RCA"}
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
                  rows="2"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Severity</label>
                  <select
                    name="severity"
                    className="form-select"
                    value={formData.severity}
                    onChange={handleChange}
                    required
                  >
                    {Object.values(RCA_SEVERITY).map((severity) => (
                      <option key={severity} value={severity}>
                        {severity}
                      </option>
                    ))}
                  </select>
                </div>

                {isEdit && (
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Status</label>
                    <select
                      name="status"
                      className="form-select"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      {Object.values(RCA_STATUS).map((status) => (
                        <option key={status} value={status}>
                          {status.replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Root Cause</label>
                <textarea
                  name="rootCause"
                  className="form-control"
                  rows="3"
                  value={formData.rootCause}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="mb-3">
                <label className="form-label">Resolution</label>
                <textarea
                  name="resolution"
                  className="form-control"
                  rows="3"
                  value={formData.resolution}
                  onChange={handleChange}
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

export default RcaFormModal;