package com.teamflow.backend.dto;

import com.teamflow.backend.enums.ReviewStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewResponse {

    private Long id;

    private Long rcaId;

    private String rcaTitle;

    private String reviewerName;

    private ReviewStatus status;

    private String comments;

    private LocalDateTime reviewedAt;

    private LocalDateTime createdAt;
}