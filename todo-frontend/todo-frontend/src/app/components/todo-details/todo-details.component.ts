import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/todos';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnInit {
  @Input() todo!: Todo;

  constructor(
    private route: ActivatedRoute,
    private service: TodoService,
    private router: Router
  ) {}

  ngOnInit() {
    const todoId = this.route.snapshot.params['id'];
    // Fetch todo details based on todoId
    this.fetchTodoDetails(todoId);
  }
  // Fetch todo details based on todoId
  fetchTodoDetails(todoId: number) {
    this.service.getTodoById(todoId).subscribe((response) => {
      this.todo = response;
    });
  }
  updateTodo() {
    // Update the todo
    const todoId = this.route.snapshot.params['id'];
    this.service.updateTodoById(todoId, this.todo).subscribe((response) => {
      this.todo = response;
      // redirect to the home page
      this.router.navigate(['/']);
    });
  }
}
