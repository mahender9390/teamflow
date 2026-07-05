package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateReviewRequest;
import com.teamflow.backend.dto.ReviewResponse;
import com.teamflow.backend.dto.UpdateReviewRequest;
import com.teamflow.backend.entity.Rca;
import com.teamflow.backend.entity.Review;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.enums.NotificationType;
import com.teamflow.backend.enums.RcaStatus;
import com.teamflow.backend.enums.ReviewStatus;
import com.teamflow.backend.exception.AccessDeniedException;
import com.teamflow.backend.exception.ResourceNotFoundException;
import com.teamflow.backend.repository.RcaRepository;
import com.teamflow.backend.repository.ReviewRepository;
import com.teamflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final RcaRepository rcaRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Override
    public ReviewResponse createReview(CreateReviewRequest request, String userEmail) {

        Rca rca = rcaRepository.findById(request.getRcaId())
                .orElseThrow(() -> new ResourceNotFoundException("RCA not found"));

        User reviewer = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Review review = Review.builder()
                .rca(rca)
                .reviewer(reviewer)
                .status(request.getStatus())
                .comments(request.getComments())
                .build();

        Review savedReview = reviewRepository.save(review);

        applyRcaStatusTransition(rca, savedReview.getStatus());
        sendReviewNotification(rca, savedReview.getStatus());

        return mapToResponse(savedReview);
    }

    @Override
    public ReviewResponse getReviewById(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        return mapToResponse(review);
    }

    @Override
    public List<ReviewResponse> getReviewsByRca(Long rcaId) {

        Rca rca = rcaRepository.findById(rcaId)
                .orElseThrow(() -> new ResourceNotFoundException("RCA not found"));

        return reviewRepository.findByRca(rca)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public ReviewResponse updateReview(Long id, UpdateReviewRequest request, String userEmail) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getReviewer().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to update this review");
        }

        review.setStatus(request.getStatus());
        review.setComments(request.getComments());
        review.setReviewedAt(LocalDateTime.now());

        Review updatedReview = reviewRepository.save(review);

        Rca rca = updatedReview.getRca();
        applyRcaStatusTransition(rca, updatedReview.getStatus());
        sendReviewNotification(rca, updatedReview.getStatus());

        return mapToResponse(updatedReview);
    }

    @Override
    public void deleteReview(Long id, String userEmail) {

        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found"));

        if (!review.getReviewer().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to delete this review");
        }

        reviewRepository.delete(review);
    }

    private void applyRcaStatusTransition(Rca rca, ReviewStatus reviewStatus) {

        if (reviewStatus == ReviewStatus.APPROVED) {
            rca.setStatus(RcaStatus.CLOSED);
            rcaRepository.save(rca);
        } else if (reviewStatus == ReviewStatus.REJECTED) {
            rca.setStatus(RcaStatus.IN_PROGRESS);
            rcaRepository.save(rca);
        }
    }

    private void sendReviewNotification(Rca rca, ReviewStatus reviewStatus) {

        if (reviewStatus == ReviewStatus.PENDING) {
            return;
        }

        String action = reviewStatus == ReviewStatus.APPROVED ? "approved" : "rejected";

        String message = "Your RCA '" + rca.getTitle() + "' has been " + action + ".";

        notificationService.createNotification(
                rca.getReportedBy(),
                "RCA Reviewed",
                message,
                NotificationType.RCA_REVIEWED
        );
    }

    private ReviewResponse mapToResponse(Review review) {
        return ReviewResponse.builder()
                .id(review.getId())
                .rcaId(review.getRca().getId())
                .rcaTitle(review.getRca().getTitle())
                .reviewerName(review.getReviewer().getFullName())
                .status(review.getStatus())
                .comments(review.getComments())
                .reviewedAt(review.getReviewedAt())
                .createdAt(review.getCreatedAt())
                .build();
    }
}