package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateRcaRequest;
import com.teamflow.backend.dto.RcaResponse;
import com.teamflow.backend.dto.UpdateRcaRequest;
import com.teamflow.backend.entity.Rca;
import com.teamflow.backend.entity.Task;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.enums.RcaStatus;
import com.teamflow.backend.exception.AccessDeniedException;
import com.teamflow.backend.exception.InvalidRequestException;
import com.teamflow.backend.exception.ResourceNotFoundException;
import com.teamflow.backend.repository.RcaRepository;
import com.teamflow.backend.repository.TaskRepository;
import com.teamflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RcaServiceImpl implements RcaService {

    private final RcaRepository rcaRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public RcaResponse createRca(CreateRcaRequest request, String userEmail) {

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        if (!task.getCreatedBy().getEmail().equals(userEmail)
                && (task.getAssignedTo() == null
                        || !task.getAssignedTo().getEmail().equals(userEmail))) {

            throw new AccessDeniedException(
                    "You are not allowed to create an RCA for this task");
        }

        User reportedBy = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (!task.getCreatedBy().getEmail().equals(userEmail)
                && (task.getAssignedTo() == null
                        || !task.getAssignedTo().getEmail().equals(userEmail))) {

            throw new AccessDeniedException(
                    "You are not allowed to create an RCA for this task");
        }

        Rca rca = Rca.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .severity(request.getSeverity())
                .rootCause(request.getRootCause())
                .resolution(request.getResolution())
                .task(task)
                .reportedBy(reportedBy)
                .build();

        Rca savedRca = rcaRepository.save(rca);

        return mapToResponse(savedRca);
    }

    @Override
    public RcaResponse getRcaById(Long id) {
        Rca rca = rcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RCA not found"));

        return mapToResponse(rca);
    }

    @Override
    public List<RcaResponse> getRcasByTask(Long taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        return rcaRepository.findByTask(task)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RcaResponse updateRca(Long id, UpdateRcaRequest request, String userEmail) {

        Rca rca = rcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RCA not found"));

        if (!rca.getReportedBy().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to update this RCA");
        }

        if (request.getStatus() == RcaStatus.CLOSED &&
                (request.getRootCause() == null
                        || request.getRootCause().isBlank())) {

            throw new InvalidRequestException(
                    "Root cause is required before closing the RCA");
        }

        rca.setTitle(request.getTitle());
        rca.setDescription(request.getDescription());
        rca.setSeverity(request.getSeverity());
        rca.setStatus(request.getStatus());
        rca.setRootCause(request.getRootCause());
        rca.setResolution(request.getResolution());

        Rca updatedRca = rcaRepository.save(rca);

        return mapToResponse(updatedRca);
    }

    @Override
    public void deleteRca(Long id, String userEmail) {

        Rca rca = rcaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("RCA not found"));

        if (!rca.getReportedBy().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("You are not allowed to delete this RCA");
        }

        rcaRepository.delete(rca);
    }

    private RcaResponse mapToResponse(Rca rca) {
        return RcaResponse.builder()
                .id(rca.getId())
                .title(rca.getTitle())
                .description(rca.getDescription())
                .severity(rca.getSeverity())
                .status(rca.getStatus())
                .rootCause(rca.getRootCause())
                .resolution(rca.getResolution())
                .taskId(rca.getTask().getId())
                .taskTitle(rca.getTask().getTitle())
                .reportedByName(rca.getReportedBy().getFullName())
                .createdAt(rca.getCreatedAt())
                .updatedAt(rca.getUpdatedAt())
                .build();
    }
}