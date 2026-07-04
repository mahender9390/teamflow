package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateTaskRelationRequest;
import com.teamflow.backend.dto.TaskRelationResponse;
import com.teamflow.backend.entity.Task;
import com.teamflow.backend.entity.TaskRelation;
import com.teamflow.backend.repository.TaskRelationRepository;
import com.teamflow.backend.repository.TaskRepository;
import com.teamflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TaskRelationServiceImpl implements TaskRelationService {

    private final TaskRelationRepository taskRelationRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public TaskRelationResponse createRelation(CreateTaskRelationRequest request, String userEmail) {

        userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (request.getPredecessorTaskId().equals(request.getSuccessorTaskId())) {
            throw new RuntimeException("A task cannot depend on itself");
        }

        Task predecessorTask = taskRepository.findById(request.getPredecessorTaskId())
                .orElseThrow(() -> new RuntimeException("Predecessor task not found"));

        Task successorTask = taskRepository.findById(request.getSuccessorTaskId())
                .orElseThrow(() -> new RuntimeException("Successor task not found"));

        if (!predecessorTask.getCreatedBy().getEmail().equals(userEmail)
                || !successorTask.getCreatedBy().getEmail().equals(userEmail)) {

            throw new RuntimeException("You can only create relations between your own tasks");
        }

        taskRelationRepository.findByPredecessorTaskAndSuccessorTaskAndRelationType(
                predecessorTask, successorTask, request.getRelationType())
                .ifPresent(existing -> {
                    throw new RuntimeException("This task relation already exists");
                });

        TaskRelation relation = TaskRelation.builder()
                .predecessorTask(predecessorTask)
                .successorTask(successorTask)
                .relationType(request.getRelationType())
                .build();

        TaskRelation savedRelation = taskRelationRepository.save(relation);

        return mapToResponse(savedRelation);
    }

    @Override
    public List<TaskRelationResponse> getRelationsForTask(Long taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        return Stream.concat(
                taskRelationRepository.findByPredecessorTask(task).stream(),
                taskRelationRepository.findBySuccessorTask(task).stream())
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteRelation(Long id, String userEmail) {

        userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));

        TaskRelation relation = taskRelationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task relation not found"));

        if (!relation.getPredecessorTask().getCreatedBy().getEmail().equals(userEmail)) {
            throw new RuntimeException("Access denied");
        }

        taskRelationRepository.delete(relation);
    }

    private TaskRelationResponse mapToResponse(TaskRelation relation) {
        return TaskRelationResponse.builder()
                .id(relation.getId())
                .predecessorTaskId(relation.getPredecessorTask().getId())
                .predecessorTaskTitle(relation.getPredecessorTask().getTitle())
                .successorTaskId(relation.getSuccessorTask().getId())
                .successorTaskTitle(relation.getSuccessorTask().getTitle())
                .relationType(relation.getRelationType())
                .build();
    }
}