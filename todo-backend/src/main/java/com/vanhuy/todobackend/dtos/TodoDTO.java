package com.vanhuy.todobackend.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoDTO {
    private Long id;
    private Long userId; // Assuming you want to transfer userId instead of the whole User object
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
}
