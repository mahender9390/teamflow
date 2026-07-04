package com.teamflow.backend.service;

import com.teamflow.backend.dto.NotificationResponse;
import com.teamflow.backend.enums.NotificationType;
import com.teamflow.backend.entity.User;

import java.util.List;

public interface NotificationService {

    List<NotificationResponse> getMyNotifications(String userEmail);

    NotificationResponse markAsRead(Long id, String userEmail);

    void deleteNotification(Long id, String userEmail);

    void createNotification(
            User user,
            String title,
            String message,
            NotificationType type);
}