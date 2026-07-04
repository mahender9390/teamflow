package com.teamflow.backend.controller;

import com.teamflow.backend.dto.CreateTaskRelationRequest;
import com.teamflow.backend.dto.TaskRelationResponse;
import com.teamflow.backend.service.TaskRelationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/task-relations")
@RequiredArgsConstructor
public class TaskRelationController {

    private final TaskRelationService taskRelationService;

    @PostMapping
    public ResponseEntity<TaskRelationResponse> createRelation(@Valid @RequestBody CreateTaskRelationRequest request) {
        String userEmail = getLoggedInUserEmail();
        TaskRelationResponse response = taskRelationService.createRelation(request, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<TaskRelationResponse>> getRelationsForTask(@PathVariable Long taskId) {
        List<TaskRelationResponse> responses = taskRelationService.getRelationsForTask(taskId);
        return ResponseEntity.ok(responses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRelation(@PathVariable Long id) {
        String userEmail = getLoggedInUserEmail();
        taskRelationService.deleteRelation(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    private String getLoggedInUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}