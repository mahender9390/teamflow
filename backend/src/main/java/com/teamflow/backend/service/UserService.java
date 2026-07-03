package com.teamflow.backend.service;

import com.teamflow.backend.dto.AuthResponse;
import com.teamflow.backend.dto.LoginRequest;
import com.teamflow.backend.dto.RegisterRequest;

public interface UserService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}