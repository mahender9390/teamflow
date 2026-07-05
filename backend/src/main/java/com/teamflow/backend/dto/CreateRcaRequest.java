package com.teamflow.backend.dto;

import com.teamflow.backend.enums.RcaSeverity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateRcaRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Severity is required")
    private RcaSeverity severity;

    private String rootCause;

    private String resolution;

    @NotNull(message = "Task id is required")
    private Long taskId;
}