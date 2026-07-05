package com.teamflow.backend.service;

import com.teamflow.backend.dto.CommentResponse;
import com.teamflow.backend.dto.CreateCommentRequest;
import com.teamflow.backend.entity.Comment;
import com.teamflow.backend.entity.Task;
import com.teamflow.backend.entity.User;
import com.teamflow.backend.enums.NotificationType;
import com.teamflow.backend.repository.CommentRepository;
import com.teamflow.backend.repository.TaskRepository;
import com.teamflow.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.teamflow.backend.exception.AccessDeniedException;
import com.teamflow.backend.exception.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    @Override
    public CommentResponse createComment(CreateCommentRequest request, String userEmail) {

        Task task = taskRepository.findById(request.getTaskId())
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Comment comment = Comment.builder()
                .comment(request.getComment())
                .task(task)
                .user(user)
                .build();

        Comment savedComment = commentRepository.save(comment);

        User recipient = task.getCreatedBy();

        if (!recipient.getId().equals(user.getId())) {

            notificationService.createNotification(
                    recipient,
                    "New Comment",
                    user.getFullName() + " commented on task: " + task.getTitle(),
                    NotificationType.COMMENT_ADDED);
        }

        return mapToResponse(savedComment);
    }

    @Override
    public List<CommentResponse> getCommentsByTask(Long taskId) {

        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        return commentRepository.findByTask(task)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteComment(Long id, String userEmail) {

        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        if (!comment.getUser().getEmail().equals(userEmail)) {
            throw new AccessDeniedException("Access denied");
        }

        commentRepository.delete(comment);
    }

    private CommentResponse mapToResponse(Comment comment) {
        return CommentResponse.builder()
                .id(comment.getId())
                .comment(comment.getComment())
                .userName(comment.getUser().getFullName())
                .createdAt(comment.getCreatedAt())
                .build();
    }
}