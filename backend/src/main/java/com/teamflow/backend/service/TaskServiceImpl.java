package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateTaskRequest;
import com.teamflow.backend.dto.TaskResponse;
import com.teamflow.backend.dto.UpdateTaskRequest;
import com.teamflow.backend.entity.Project;
import com.teamflow.backend.entity.Task;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.enums.NotificationType;
import com.teamflow.backend.enums.TaskPriority;
import com.teamflow.backend.enums.TaskStatus;
import com.teamflow.backend.repository.ProjectRepository;
import com.teamflow.backend.repository.TaskRepository;
import com.teamflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.teamflow.backend.exception.AccessDeniedException;
import com.teamflow.backend.exception.InvalidRequestException;
import com.teamflow.backend.exception.ResourceNotFoundException;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Override
    public TaskResponse createTask(CreateTaskRequest request, String userEmail) {

        if (request.getDueDate().isBefore(LocalDate.now())) {
            throw new InvalidRequestException("Due date must be today or in the future");
        }

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        if (!project.getCreatedBy().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You can only create tasks in your own projects");
        }

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Assigned user not found"));

        User loggedInUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Task task = Task.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(request.getStatus())
                .dueDate(request.getDueDate())
                .project(project)
                .assignedTo(assignedUser)
                .createdBy(loggedInUser)
                .build();

        Task savedTask = taskRepository.save(task);
        notificationService.createNotification(
                assignedUser,
                "New Task Assigned",
                "You have been assigned task: " + savedTask.getTitle(),
                NotificationType.TASK_ASSIGNED);

        return mapToResponse(savedTask);
    }

    @Override
    public List<TaskResponse> getTasksByProject(Long projectId) {

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        return taskRepository.findByProject(project)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponse getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        return mapToResponse(task);
    }

    @Override
    public TaskResponse updateTask(Long id, UpdateTaskRequest request, String userEmail) {

        if (request.getDueDate().isBefore(LocalDate.now())) {
            throw new InvalidRequestException("Due date must be today or in the future");
        }

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("Access denied");
        }

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow(() -> new ResourceNotFoundException("Project not found"));

        User assignedUser = userRepository.findById(request.getAssignedUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Assigned user not found"));

        task.setTitle(request.getTitle());
        task.setDescription(request.getDescription());
        task.setPriority(request.getPriority());
        task.setStatus(request.getStatus());
        task.setDueDate(request.getDueDate());
        task.setProject(project);
        task.setAssignedTo(assignedUser);

        Task updatedTask = taskRepository.save(task);

        notificationService.createNotification(
                assignedUser,
                "Task Updated",
                "Task '" + updatedTask.getTitle() + "' has been updated.",
                NotificationType.TASK_UPDATED);

        return mapToResponse(updatedTask);
    }

    @Override
    public void deleteTask(Long id, String userEmail) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("Access denied");
        }

        taskRepository.delete(task);
    }

     @Override
    public Page<TaskResponse> getAllTasks(Pageable pageable) {
        return taskRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Override
    public Page<TaskResponse> getTasksByStatus(TaskStatus status, Pageable pageable) {
        return taskRepository.findByStatus(status, pageable)
                .map(this::mapToResponse);
    }

    @Override
    public Page<TaskResponse> getTasksByPriority(TaskPriority priority, Pageable pageable) {
        return taskRepository.findByPriority(priority, pageable)
                .map(this::mapToResponse);
    }


    @Override
    public Page<TaskResponse> getTasksByAssignedUser(Long userId, Pageable pageable) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return taskRepository.findByAssignedTo(user, pageable)
                .map(this::mapToResponse);
    }

    @Override
    public Page<TaskResponse> searchTasksByKeyword(String keyword, Pageable pageable) {
        return taskRepository.findByTitleContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    private TaskResponse mapToResponse(Task task) {
        return TaskResponse.builder()
                .id(task.getId())
                .title(task.getTitle())
                .description(task.getDescription())
                .priority(task.getPriority())
                .status(task.getStatus())
                .dueDate(task.getDueDate())
                .projectName(task.getProject().getName())
                .assignedUserName(task.getAssignedTo() != null ? task.getAssignedTo().getFullName() : null)
                .createdByName(task.getCreatedBy().getFullName())
                .createdAt(task.getCreatedAt())
                .updatedAt(task.getUpdatedAt())
                .build();
    }
}