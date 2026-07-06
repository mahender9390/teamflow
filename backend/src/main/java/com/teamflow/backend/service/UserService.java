package com.teamflow.backend.service;

import com.teamflow.backend.dto.AuthResponse;
import com.teamflow.backend.dto.LoginRequest;
import com.teamflow.backend.dto.RegisterRequest;
import com.teamflow.backend.dto.UserSummaryResponse;
import java.util.List;

public interface UserService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);

    List<UserSummaryResponse> getAllUsers();
}