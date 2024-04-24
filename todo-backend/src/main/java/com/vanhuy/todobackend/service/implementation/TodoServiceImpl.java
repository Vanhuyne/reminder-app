package com.vanhuy.todobackend.service.implementation;

import com.vanhuy.todobackend.dtos.TodoDTO;
import com.vanhuy.todobackend.entity.Todo;
import com.vanhuy.todobackend.entity.User;
import com.vanhuy.todobackend.repo.TodoRepo;
import com.vanhuy.todobackend.repo.UserRepo;
import com.vanhuy.todobackend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {
    private final TodoRepo todoRepo;
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;

    @Override
    public TodoDTO create(TodoDTO todoDTO) {
        User user = userRepo.findByEmail(todoDTO.getUserEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Todo todo = modelMapper.map(todoDTO, Todo.class);
        todo.setUser(user);
        Todo savedTodo = todoRepo.save(todo);

        return modelMapper.map(savedTodo, TodoDTO.class);
    }

    // update todo
    @Override
    public TodoDTO update(Long todoId , TodoDTO todoDTO) {
        Todo todo = todoRepo.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        todo.setTitle(todoDTO.getTitle());
        todo.setDescription(todoDTO.getDescription());
        todo.setDueDate(todoDTO.getDueDate());
        todo.setCompleted(todoDTO.isCompleted());

        Todo updatedTodo = todoRepo.save(todo);

        // Convert Todo to TodoDTO
        TodoDTO todoDTOResponse = modelMapper.map(updatedTodo, TodoDTO.class);
        todoDTOResponse.setUserEmail(updatedTodo.getUser().getEmail());

        return todoDTOResponse;
    }

    // delete todo
    @Override
    public void delete(Long todoId) {
        Todo todo = todoRepo.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        todoRepo.delete(todo);
    }

    // get todo by id
    @Override
    public TodoDTO getTodoById(Long todoId) {
        Todo todo = todoRepo.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        // Convert Todo to TodoDTO
        TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
        todoDTO.setUserEmail(todo.getUser().getEmail());

        return todoDTO;
    }

    //find all paginated
    @Override
    public Page<TodoDTO> findAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Todo> resultPage = todoRepo.findAll(pageable);
        // Convert Page<Todo> to Page<TodoDTO>
        return resultPage.map(todo -> {
            TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
            todoDTO.setUserEmail(todo.getUser().getEmail());
            return todoDTO;
        });
    }

    // find all paginated todos by email of user
    @Override
    public Page<TodoDTO> findAllPaginatedByEmail(String email, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Todo> resultPage = todoRepo.findAllByUserEmail(email, pageable);
        // Convert Page<Todo> to Page<TodoDTO>
        return resultPage.map(todo -> {
            TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
            todoDTO.setUserEmail(todo.getUser().getEmail());
            return todoDTO;
        });
    }

}
