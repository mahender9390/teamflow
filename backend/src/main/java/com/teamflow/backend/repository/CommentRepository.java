package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Comment;
import com.teamflow.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;


public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByTask(Task task);
}