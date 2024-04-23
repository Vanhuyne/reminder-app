package com.vanhuy.todobackend.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class TodoDTO {
    private Long id;
    private String userEmail;
    private String title;
    private String description;
    private LocalDate dueDate;
    private boolean completed;
}
