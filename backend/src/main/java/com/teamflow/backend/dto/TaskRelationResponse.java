package com.teamflow.backend.dto;

import com.teamflow.backend.enums.TaskRelationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TaskRelationResponse {

    private Long id;

    private Long predecessorTaskId;

    private String predecessorTaskTitle;

    private Long successorTaskId;

    private String successorTaskTitle;

    private TaskRelationType relationType;
}