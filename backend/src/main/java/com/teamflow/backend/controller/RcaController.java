package com.teamflow.backend.controller;

import com.teamflow.backend.dto.CreateRcaRequest;
import com.teamflow.backend.dto.RcaResponse;
import com.teamflow.backend.dto.UpdateRcaRequest;
import com.teamflow.backend.service.RcaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rca")
@RequiredArgsConstructor
public class RcaController {

    private final RcaService rcaService;

    @PostMapping
    public ResponseEntity<RcaResponse> createRca(@Valid @RequestBody CreateRcaRequest request) {
        String userEmail = getLoggedInUserEmail();
        RcaResponse response = rcaService.createRca(request, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RcaResponse> getRcaById(@PathVariable Long id) {
        RcaResponse response = rcaService.getRcaById(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/task/{taskId}")
    public ResponseEntity<List<RcaResponse>> getRcasByTask(@PathVariable Long taskId) {
        List<RcaResponse> responses = rcaService.getRcasByTask(taskId);
        return ResponseEntity.ok(responses);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RcaResponse> updateRca(@PathVariable Long id,
                                                  @Valid @RequestBody UpdateRcaRequest request) {
        String userEmail = getLoggedInUserEmail();
        RcaResponse response = rcaService.updateRca(id, request, userEmail);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRca(@PathVariable Long id) {
        String userEmail = getLoggedInUserEmail();
        rcaService.deleteRca(id, userEmail);
        return ResponseEntity.noContent().build();
    }

    private String getLoggedInUserEmail() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}