package com.vanhuy.todobackend.service;

import com.vanhuy.todobackend.dtos.TodoDTO;
import com.vanhuy.todobackend.entity.Todo;
import com.vanhuy.todobackend.entity.User;
import com.vanhuy.todobackend.repo.TodoRepo;
import com.vanhuy.todobackend.repo.UserRepo;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {
    private final TodoRepo todoRepo;
    private final ModelMapper modelMapper;
    private final UserRepo userRepo;

    public List<TodoDTO> getAllTodos() {
        List<Todo> todos = todoRepo.findAll();

        // Convert List<Todo> to List<TodoDTO>
        return todos.stream()
                .map(todo ->{
                            TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
                            todoDTO.setUserId(todo.getUser().getId());
                            return todoDTO;
                        }
                )
                .toList();
    }

    public TodoDTO create(TodoDTO todoDTO) {
        User user = userRepo.findById(todoDTO.getUserId())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        Todo todo = modelMapper.map(todoDTO, Todo.class);
        todo.setUser(user);
        Todo savedTodo = todoRepo.save(todo);

        return modelMapper.map(savedTodo, TodoDTO.class);
    }

    // update todo
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
        todoDTOResponse.setUserId(updatedTodo.getUser().getId());

        return todoDTOResponse;
    }

    // delete todo
    public void delete(Long todoId) {
        Todo todo = todoRepo.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        todoRepo.delete(todo);
    }

    // get todo by id
    public TodoDTO getTodoById(Long todoId) {
        Todo todo = todoRepo.findById(todoId)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found"));

        // Convert Todo to TodoDTO
        TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
        todoDTO.setUserId(todo.getUser().getId());

        return todoDTO;
    }

    //find all paginated
    public Page<TodoDTO> findAllPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Todo> resultPage = todoRepo.findAll(pageable);
        // Convert Page<Todo> to Page<TodoDTO>
        return resultPage.map(todo -> {
            TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
            todoDTO.setUserId(todo.getUser().getId());
            return todoDTO;
        });
    }
}
