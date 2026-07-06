import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../api/projectApi";
import { PROJECT_STATUS_COLORS } from "../../utils/constants";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import ConfirmModal from "../../components/ConfirmModal/ConfirmModal";
import ProjectFormModal from "./ProjectFormModal";
import Loader from "../../components/Loader/Loader";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await getAllProjects();
      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateClick = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData);
        toast.success("Project updated successfully");
      } else {
        await createProject(formData);
        toast.success("Project created successfully");
      }
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      const message = error.response?.data?.message || "Operation failed";
      toast.error(message);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteProject(deleteTarget.id);
      toast.success("Project deleted successfully");
      setDeleteTarget(null);
      fetchProjects();
    } catch (error) {
      const message = error.response?.data?.message || "Delete failed";
      toast.error(message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="page-title mb-0">Projects</h4>
        <button className="btn btn-primary btn-sm" onClick={handleCreateClick}>
          <FaPlus className="me-1" /> New Project
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-hover bg-white shadow-sm rounded">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Created By</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-secondary py-4">
                  No projects found.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id}>
                  <td className="fw-semibold">{project.name}</td>
                  <td className="text-truncate" style={{ maxWidth: "220px" }}>
                    {project.description}
                  </td>
                  <td>
                    <StatusBadge
                      status={project.status}
                      colorMap={PROJECT_STATUS_COLORS}
                    />
                  </td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.createdByName}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEditClick(project)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setDeleteTarget(project)}
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

      <ProjectFormModal
        show={showForm}
        initialData={editingProject}
        onSubmit={handleFormSubmit}
        onCancel={() => setShowForm(false)}
      />

      <ConfirmModal
        show={!!deleteTarget}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteTarget?.name}"?`}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
};

export default Projects;