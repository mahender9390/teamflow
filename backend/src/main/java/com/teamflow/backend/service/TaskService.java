package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateTaskRequest;
import com.teamflow.backend.dto.TaskResponse;
import com.teamflow.backend.dto.UpdateTaskRequest;
import com.teamflow.backend.enums.TaskPriority;
import com.teamflow.backend.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface TaskService {

    TaskResponse createTask(CreateTaskRequest request, String userEmail);

    List<TaskResponse> getTasksByProject(Long projectId);

    TaskResponse getTaskById(Long id);

    TaskResponse updateTask(Long id, UpdateTaskRequest request, String userEmail);

    void deleteTask(Long id, String userEmail);

    Page<TaskResponse> getAllTasks(Pageable pageable);

    Page<TaskResponse> getTasksByStatus(TaskStatus status, Pageable pageable);

    Page<TaskResponse> getTasksByPriority(TaskPriority priority, Pageable pageable);

    Page<TaskResponse> getTasksByAssignedUser(Long userId, Pageable pageable);

    Page<TaskResponse> searchTasksByKeyword(String keyword, Pageable pageable);
}