package com.teamflow.backend.controller;

import com.teamflow.backend.dto.CreateReviewRequest;
import com.teamflow.backend.dto.ReviewResponse;
import com.teamflow.backend.dto.UpdateReviewRequest;
import com.teamflow.backend.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;

    @PostMapping
    public ResponseEntity<ReviewResponse> createReview(@Valid @RequestBody CreateReviewRequest request) {
        String userEmail = getLoggedInUserEmail();
        ReviewResponse response = reviewService.createReview(request, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ReviewResponse> getReviewById(@PathVariable Long id) {
        ReviewResponse response = reviewService.getReviewById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/rca/{rcaId}")
    public ResponseEntity<List<ReviewResponse>> getReviewsByRca(@PathVariable Long rcaId) {
        List<ReviewResponse> responses = reviewService.getReviewsByRca(rcaId);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponse> updateReview(@PathVariable Long id,
                                                        @Valid @RequestBody UpdateReviewRequest request) {
        String userEmail = getLoggedInUserEmail();
        ReviewResponse response = reviewService.updateReview(id, request, userEmail);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long id) {
        String userEmail = getLoggedInUserEmail();
        reviewService.deleteReview(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    private String getLoggedInUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}