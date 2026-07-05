package com.teamflow.backend.dto;

import com.teamflow.backend.enums.RcaSeverity;
import com.teamflow.backend.enums.RcaStatus;
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
public class UpdateRcaRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Severity is required")
    private RcaSeverity severity;

    @NotNull(message = "Status is required")
    private RcaStatus status;

    private String rootCause;

    private String resolution;
}