package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Notification;
import com.teamflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {

    long countByUserAndIsReadFalse(User user);

    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}