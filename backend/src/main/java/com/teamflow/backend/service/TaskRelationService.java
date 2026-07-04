package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateTaskRelationRequest;
import com.teamflow.backend.dto.TaskRelationResponse;

import java.util.List;

public interface TaskRelationService {

    TaskRelationResponse createRelation(CreateTaskRelationRequest request, String userEmail);

    List<TaskRelationResponse> getRelationsForTask(Long taskId);

    void deleteRelation(Long id, String userEmail);
}