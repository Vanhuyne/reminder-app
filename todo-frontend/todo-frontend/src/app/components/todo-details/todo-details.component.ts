import { Component, Input } from '@angular/core';

import { Todo } from 'src/app/models/todos';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent {
  @Input() selectedTodo: Todo | null = null;

  constructor(private todoService: TodoService) {}
  updateTodo() {
    if (this.selectedTodo && this.selectedTodo.id !== undefined) {
      this.todoService
        .updateTodoById(this.selectedTodo.id, this.selectedTodo)
        .subscribe({
          next: (updatedTodo) => {
            this.selectedTodo = updatedTodo;
          },
          error: (error) => {
            console.error('Error updating todo:', error);
          },
        });
    } else {
      console.error('Todo or todo ID is undefined.');
    }
  }
}
