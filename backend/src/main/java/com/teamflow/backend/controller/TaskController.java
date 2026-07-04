package com.teamflow.backend.controller;

import com.teamflow.backend.dto.CreateTaskRequest;
import com.teamflow.backend.dto.TaskResponse;
import com.teamflow.backend.dto.UpdateTaskRequest;
import com.teamflow.backend.service.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.teamflow.backend.enums.TaskPriority;
import com.teamflow.backend.enums.TaskStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponse> createTask(@Valid @RequestBody CreateTaskRequest request) {
        String userEmail = getLoggedInUserEmail();
        TaskResponse response = taskService.createTask(request, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping
    public ResponseEntity<Page<TaskResponse>> getAllTasks(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {

        Page<TaskResponse> responses = taskService.getAllTasks(pageable);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<TaskResponse>> getTasksByProject(@PathVariable Long projectId) {
        List<TaskResponse> responses = taskService.getTasksByProject(projectId);
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponse> getTaskById(@PathVariable Long id) {
        TaskResponse response = taskService.getTaskById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<Page<TaskResponse>> getTasksByStatus(
            @PathVariable TaskStatus status,
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {

        Page<TaskResponse> responses = taskService.getTasksByStatus(status, pageable);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/priority/{priority}")
    public ResponseEntity<Page<TaskResponse>> getTasksByPriority(
            @PathVariable TaskPriority priority,
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {

        Page<TaskResponse> responses = taskService.getTasksByPriority(priority, pageable);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/assigned/{userId}")
    public ResponseEntity<Page<TaskResponse>> getTasksByAssignedUser(
            @PathVariable Long userId,
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {

        Page<TaskResponse> responses = taskService.getTasksByAssignedUser(userId, pageable);

        return ResponseEntity.ok(responses);
    }

    @GetMapping("/search")
    public ResponseEntity<Page<TaskResponse>> searchTasks(
            @RequestParam String keyword,
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {

        Page<TaskResponse> responses = taskService.searchTasksByKeyword(keyword, pageable);

        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponse> updateTask(@PathVariable Long id,
            @Valid @RequestBody UpdateTaskRequest request) {
        String userEmail = getLoggedInUserEmail();
        TaskResponse response = taskService.updateTask(id, request, userEmail);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        String userEmail = getLoggedInUserEmail();
        taskService.deleteTask(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    private String getLoggedInUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}