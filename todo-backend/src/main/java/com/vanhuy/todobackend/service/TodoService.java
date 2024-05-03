package com.vanhuy.todobackend.service;

import com.vanhuy.todobackend.dtos.TodoDTO;
import org.springframework.data.domain.Page;

public interface TodoService {
    TodoDTO create(TodoDTO todoDTO);
    TodoDTO update(Long todoId , TodoDTO todoDTO);
    void delete(Long todoId);
    TodoDTO getTodoById(Long todoId);
    Page<TodoDTO> findAllPaginated(int page, int size);
    Page<TodoDTO> findAllPaginatedByEmail(String email, int page, int size);
    Page<TodoDTO> findAllPaginatedByCompleted(String email,int page, int size);
    Page<TodoDTO> findAllPaginatedByRemaining(String email, int page, int size);
}
