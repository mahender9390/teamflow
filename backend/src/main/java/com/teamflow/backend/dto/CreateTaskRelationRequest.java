package com.teamflow.backend.dto;

import com.teamflow.backend.enums.TaskRelationType;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateTaskRelationRequest {

    @NotNull(message = "Predecessor task id is required")
    private Long predecessorTaskId;

    @NotNull(message = "Successor task id is required")
    private Long successorTaskId;

    @NotNull(message = "Relation type is required")
    private TaskRelationType relationType;
}