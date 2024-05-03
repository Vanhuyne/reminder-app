import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Todo } from 'src/app/models/todos';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent {
  @Input() selectedTodo: Todo | null = null;
  @Output() todoUpdated: EventEmitter<void> = new EventEmitter<void>();

  ngOnChanges() {
    this.emitTodoUpdated();
  }
  private emitTodoUpdated() {
    this.todoUpdated.emit();
  }

  constructor(
    private todoService: TodoService,
    private toastr: ToastrService
  ) {}
  updateTodo() {
    if (this.selectedTodo && this.selectedTodo.id !== undefined) {
      this.todoService
        .updateTodoById(this.selectedTodo.id, this.selectedTodo)
        .subscribe({
          next: (updatedTodo) => {
            this.selectedTodo = updatedTodo;
            this.emitTodoUpdated();
            this.toastr.success('Success!', 'Save changed!', {
              timeOut: 1500,
            });
          },
          error: (error) => {
            console.error('Error updating todo:', error);
            this.toastr.error('Error!', 'Update faild!', {
              timeOut: 1500,
            });
          },
        });
    } else {
      console.error('Todo or todo ID is undefined.');
      this.toastr.warning('Warning!', 'Todo or todo ID is undefined!', {
        timeOut: 1500,
      });
    }
  }
}
