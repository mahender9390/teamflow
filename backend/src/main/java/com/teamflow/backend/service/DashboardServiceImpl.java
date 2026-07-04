package com.teamflow.backend.service;

import com.teamflow.backend.dto.DashboardResponse;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.enums.TaskStatus;
import com.teamflow.backend.repository.NotificationRepository;
import com.teamflow.backend.repository.ProjectRepository;
import com.teamflow.backend.repository.TaskRepository;
import com.teamflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskRepository taskRepository;
    private final NotificationRepository notificationRepository;

    @Override
    public DashboardResponse getDashboard(String userEmail) {

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));


        long totalProjects = projectRepository.countByCreatedBy(user);

        long totalTasks = taskRepository.count();

        long completedTasks = taskRepository.countByStatus(TaskStatus.DONE);

        long pendingTasks = taskRepository.countByStatus(TaskStatus.TODO);

        long inProgressTasks = taskRepository.countByStatus(TaskStatus.IN_PROGRESS);

        long overdueTasks = taskRepository.countByDueDateBefore(LocalDate.now());
        long myAssignedTasks = taskRepository.countByAssignedTo(user);

        long unreadNotifications = notificationRepository.countByUserAndIsReadFalse(user);

        return DashboardResponse.builder()
                .totalProjects(totalProjects)
                .totalTasks(totalTasks)
                .completedTasks(completedTasks)
                .pendingTasks(pendingTasks)
                .inProgressTasks(inProgressTasks)
                .overdueTasks(overdueTasks)
                .myAssignedTasks(myAssignedTasks)
                .unreadNotifications(unreadNotifications)
                .build();
    }
}