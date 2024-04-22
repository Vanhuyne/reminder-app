package com.vanhuy.todobackend.controller;

import com.vanhuy.todobackend.dtos.TodoDTO;
import com.vanhuy.todobackend.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class TodoController {
    private final TodoService todoService;

    @PostMapping
    public ResponseEntity<TodoDTO> create(@RequestBody TodoDTO todoDTO) {
        TodoDTO createdTodo = todoService.create(todoDTO);
        return new ResponseEntity<>(createdTodo, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TodoDTO> update(@PathVariable Long id, @RequestBody TodoDTO todoDTO) {
        try {
            TodoDTO updatedTodo = todoService.update(id, todoDTO);
            return new ResponseEntity<>(updatedTodo, HttpStatus.OK);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            todoService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<TodoDTO> getTodoById(@PathVariable Long id) {
        try {
            TodoDTO todo = todoService.getTodoById(id);
            return new ResponseEntity<>(todo, HttpStatus.OK);
        }catch (Exception e)
        {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping
    public ResponseEntity<Page<TodoDTO>> getAllPaginated (@RequestParam(defaultValue = "0") int page,
                                                          @RequestParam(defaultValue = "5") int size

    ) {
        Page<TodoDTO> resultPage  = todoService.findAllPaginated(page, size);
        //List<TodoDTO> todoDTOS = resultPage.getContent().stream().toList();
        return new ResponseEntity<>(resultPage, HttpStatus.OK);
    }



}
