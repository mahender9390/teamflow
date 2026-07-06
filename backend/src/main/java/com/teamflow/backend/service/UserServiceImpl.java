package com.teamflow.backend.service;

import com.teamflow.backend.dto.AuthResponse;
import com.teamflow.backend.dto.LoginRequest;
import com.teamflow.backend.dto.RegisterRequest;
import com.teamflow.backend.dto.UserSummaryResponse;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.exception.EmailAlreadyExistsException;
import com.teamflow.backend.repository.UserRepository;
import com.teamflow.backend.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final AuthenticationManager authenticationManager;
        private final JwtService jwtService;

        @Override
        public AuthResponse register(RegisterRequest request) {

                if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                        throw new EmailAlreadyExistsException("Email already exists");
                }

                User user = User.builder()
                                .fullName(request.getFullName())
                                .email(request.getEmail())
                                .password(passwordEncoder.encode(request.getPassword()))
                                .role(request.getRole())
                                .build();

                userRepository.save(user);

                return AuthResponse.builder()
                                .token(null)
                                .type("Bearer")
                                .message("User registered successfully")
                                .build();
        }

        @Override
        public AuthResponse login(LoginRequest request) {

                authenticationManager.authenticate(
                                new UsernamePasswordAuthenticationToken(
                                                request.getEmail(),
                                                request.getPassword()));

                String token = jwtService.generateToken(request.getEmail());

                return AuthResponse.builder()
                                .token(token)
                                .type("Bearer")
                                .message("Login successful")
                                .build();
        }

        @Override
        public List<UserSummaryResponse> getAllUsers() {

                return userRepository.findAll()
                                .stream()
                                .map(user -> UserSummaryResponse.builder()
                                                .id(user.getId())
                                                .fullName(user.getFullName())
                                                .email(user.getEmail())
                                                .build())
                                .toList();
        }
}