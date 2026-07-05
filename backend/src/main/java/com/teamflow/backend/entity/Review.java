package com.teamflow.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "RCA is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rca_id", nullable = false)
    private Rca rca;

    @NotNull(message = "Reviewer is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewer_id", nullable = false)
    private User reviewer;

    @NotNull(message = "Status is required")
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private com.teamflow.backend.enums.ReviewStatus status;

    @Column(name = "comments", length = 2000)
    private String comments;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.reviewedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = com.teamflow.backend.enums.ReviewStatus.PENDING;
        }
    }
}