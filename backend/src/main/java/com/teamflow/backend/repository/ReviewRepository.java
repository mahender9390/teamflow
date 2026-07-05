package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Rca;
import com.teamflow.backend.entity.Review;
import com.teamflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    List<Review> findByRca(Rca rca);

    List<Review> findByReviewer(User reviewer);
}