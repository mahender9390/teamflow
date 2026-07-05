package com.teamflow.backend.dto;

import com.teamflow.backend.enums.ReviewStatus;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateReviewRequest {

    @NotNull(message = "RCA id is required")
    private Long rcaId;

    @NotNull(message = "Status is required")
    private ReviewStatus status;

    private String comments;
}