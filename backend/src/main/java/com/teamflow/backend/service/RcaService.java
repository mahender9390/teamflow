package com.teamflow.backend.service;

import com.teamflow.backend.dto.CreateRcaRequest;
import com.teamflow.backend.dto.RcaResponse;
import com.teamflow.backend.dto.UpdateRcaRequest;

import java.util.List;

public interface RcaService {

    RcaResponse createRca(CreateRcaRequest request, String userEmail);

    RcaResponse getRcaById(Long id);

    List<RcaResponse> getRcasByTask(Long taskId);

    RcaResponse updateRca(Long id, UpdateRcaRequest request, String userEmail);

    void deleteRca(Long id, String userEmail);
}