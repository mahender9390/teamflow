package com.teamflow.backend.service;

import com.teamflow.backend.dto.CommentResponse;
import com.teamflow.backend.dto.CreateCommentRequest;

import java.util.List;

public interface CommentService {

    CommentResponse createComment(CreateCommentRequest request, String userEmail);

    List<CommentResponse> getCommentsByTask(Long taskId);

    void deleteComment(Long id, String userEmail);
}