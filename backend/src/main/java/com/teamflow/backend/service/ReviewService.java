package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateReviewRequest;
import com.teamflow.backend.dto.ReviewResponse;
import com.teamflow.backend.dto.UpdateReviewRequest;

import java.util.List;

public interface ReviewService {

    ReviewResponse createReview(CreateReviewRequest request, String userEmail);

    ReviewResponse getReviewById(Long id);

    List<ReviewResponse> getReviewsByRca(Long rcaId);

    ReviewResponse updateReview(Long id, UpdateReviewRequest request, String userEmail);

    void deleteReview(Long id, String userEmail);
}