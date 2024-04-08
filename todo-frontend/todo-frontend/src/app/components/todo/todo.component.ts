import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Todo } from 'src/app/models/todos';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent {
  constructor(private router: Router, private service: TodoService) {}
  @Input() todo!: Todo;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick() {
    this.delete.emit(this.todo.id);
  }
  // Property to hold the selected todo for updating

  updateTodoStatus() {
    // Check if todo and its id are defined before making the API call
    if (this.todo && this.todo.id !== undefined) {
      // Call the updateTodoById method with the todo's ID and the updated todo object
      this.service.updateTodoById(this.todo.id, this.todo).subscribe(
        (updatedTodo) => {
          this.todo = updatedTodo;
        },
        (error) => {
          console.error('Error updating todo:', error);
        }
      );
    } else {
      console.error('Todo or todo ID is undefined.');
    }
  }
  onTodoClick(todoId: number = 0) {
    this.router.navigate(['/todos', todoId]);
  }
}
