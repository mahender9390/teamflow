package com.teamflow.backend.repository;

import com.teamflow.backend.entity.Rca;
import com.teamflow.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RcaRepository extends JpaRepository<Rca, Long> {

    List<Rca> findByTask(Task task);
}