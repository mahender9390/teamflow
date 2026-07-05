package com.teamflow.backend.dto;

import com.teamflow.backend.enums.RcaSeverity;
import com.teamflow.backend.enums.RcaStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RcaResponse {

    private Long id;

    private String title;

    private String description;

    private RcaSeverity severity;

    private RcaStatus status;

    private String rootCause;

    private String resolution;

    private Long taskId;

    private String taskTitle;

    private String reportedByName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}