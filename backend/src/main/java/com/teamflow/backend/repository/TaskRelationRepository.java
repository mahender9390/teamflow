package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Task;
import com.teamflow.backend.entity.TaskRelation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TaskRelationRepository extends JpaRepository<TaskRelation, Long> {

    List<TaskRelation> findByPredecessorTask(Task task);

    List<TaskRelation> findBySuccessorTask(Task task);

    Optional<TaskRelation> findByPredecessorTaskAndSuccessorTaskAndRelationType(
            Task predecessorTask, Task successorTask, com.teamflow.backend.enums.TaskRelationType relationType);
}