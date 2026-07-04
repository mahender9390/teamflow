package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Project;
import com.teamflow.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface ProjectRepository extends JpaRepository<Project, Long> {

    long countByCreatedBy(User user);
    List<Project> findByCreatedBy(User user);

}