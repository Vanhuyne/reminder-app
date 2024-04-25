import { Component, OnInit, ViewChild } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from 'src/app/models/todos';
import { HttpClient } from '@angular/common/http';
import { TodoService } from 'src/app/service/todo.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];

  email: string = '';

  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 3;

  newTodoTitle: string = '';
  newTodoDescription: string = '';
  newTodoDueDate: string = '';

  constructor(
    private service: TodoService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      // redirect to login page
      this.authService.logout();
      this.router.navigate(['/login']);
    } else {
      this.loadTodos();
    }
  }

  addNewTodo() {
    const newTodo: Todo = {
      userEmail: this.getEmailFormLocalStorage(), // chưa có user nên để 4
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      dueDate: this.newTodoDueDate,
      completed: false,
    };

    // Call the addTodo method of the TodoComponent
    this.service.addNewTodo(newTodo).subscribe((response) => {
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.newTodoDueDate = '';

      this.loadTodos();
    });
  }

  // fetch all todos
  loadTodos() {
    this.email = this.getEmailFormLocalStorage();
    this.service
      .fetchPaginatedTodos(this.currentPage - 1, this.pageSize, this.email)
      .subscribe((response: any) => {
        this.todos = response.content;
        console.log('todos', this.todos);
        this.totalItems = response.totalElements;
      });
  }

  // set page
  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadTodos();
  }
  // action delete todo
  deleteTodo(todoId: number) {
    this.service.deleteTodoById(todoId).subscribe(
      () => {
        console.log('Todo deleted successfully');

        // After deleting the todo, reload the todos
        if (this.todos.length === 1) {
          this.loadTodos();
        } else {
          this.loadTodos();
        }
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  // Calculate total pages based on total items and page size
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getEmailFormLocalStorage() {
    return this.authService.getEmailFormToken();
  }
}
