package com.teamflow.backend.dto;

import com.teamflow.backend.enums.TaskPriority;
import com.teamflow.backend.enums.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskResponse {

    private Long id;

    private String title;

    private String description;

    private TaskPriority priority;

    private TaskStatus status;

    private LocalDate dueDate;

    private String projectName;

    private String assignedUserName;

    private String createdByName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}