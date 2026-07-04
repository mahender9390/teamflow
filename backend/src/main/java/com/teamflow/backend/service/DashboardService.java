package com.teamflow.backend.service;

import com.teamflow.backend.dto.DashboardResponse;

public interface DashboardService {

    DashboardResponse getDashboard(String userEmail);
}