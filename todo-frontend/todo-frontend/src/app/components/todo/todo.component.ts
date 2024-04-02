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
  constructor(private router: Router) {}
  @Input() todo!: Todo;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  onDeleteClick() {
    this.delete.emit(this.todo.id);
  }
  // Property to hold the selected todo for updating

  onUpdateClick() {
    // Set the selected todo when the update icon is clicked
  }
  onTodoClick(todoId?: number) {
    this.router.navigate(['/todos', todoId]);
  }
}
