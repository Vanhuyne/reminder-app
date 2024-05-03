package com.vanhuy.todobackend.repo;

import com.vanhuy.todobackend.entity.Todo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<Todo, Long> {
    Page<Todo> findAllByUserEmail(String email, Pageable pageable);
    Page<Todo> findByUserEmailAndCompletedIsTrue(String email, Pageable pageable);
    Page<Todo> findByUserEmailAndCompletedIsFalse(String email, Pageable pageable);
}