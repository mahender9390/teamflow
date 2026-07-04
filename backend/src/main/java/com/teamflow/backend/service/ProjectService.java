package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateProjectRequest;
import com.teamflow.backend.dto.ProjectResponse;
import com.teamflow.backend.dto.UpdateProjectRequest;

import java.util.List;

public interface ProjectService {

    ProjectResponse createProject(CreateProjectRequest request, String userEmail);

    List<ProjectResponse> getAllProjects();

    ProjectResponse getProjectById(Long id);

    ProjectResponse updateProject(Long id, UpdateProjectRequest request,String userEmail);

    void deleteProject(Long id, String userEmail);
}