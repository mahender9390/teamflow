package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Project;
import com.teamflow.backend.entity.Task;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.enums.TaskStatus;

import org.springframework.data.jpa.repository.JpaRepository;
import com.teamflow.backend.enums.TaskPriority;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    long count();

    long countByCreatedBy(User user);

    Page<Task> findByStatus(TaskStatus status, Pageable pageable);

    Page<Task> findByPriority(TaskPriority priority, Pageable pageable);

    Page<Task> findByAssignedTo(User user, Pageable pageable);

    Page<Task> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    long countByAssignedTo(User user);

    long countByStatus(TaskStatus status);

    long countByDueDateBefore(LocalDate date);

    List<Task> findByProject(Project project);

    List<Task> findByAssignedTo(User user);
}