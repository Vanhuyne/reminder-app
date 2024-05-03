import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from 'src/app/models/todos';
import { TodoService } from 'src/app/service/todo.service';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  activeNavItem: string = 'Today';

  todos: Todo[] = [];

  email: string = '';

  totalItems: number = 0;
  currentPage: number = 1;
  pageSize: number = 5;

  newTodoTitle: string = '';
  newTodoDescription: string = '';
  newTodoDueDate: string = '';

  selectedTodo: Todo | null = null;

  totalTodoCompleted: number = 0;
  totalTodoRemaining: number = 0;

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
      this.action(this.activeNavItem);
    }
  }

  addNewTodo() {
    debugger;
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
    this.action(this.activeNavItem);
  }

  // action delete todo
  deleteTodo(todoId: number) {
    this.service.deleteTodoById(todoId).subscribe(
      () => {
        console.log('Todo deleted successfully');
        this.action(this.activeNavItem);
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }

  reloadTodoList() {
    this.action(this.activeNavItem);
  }
  // Calculate total pages based on total items and page size
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  getEmailFormLocalStorage() {
    return this.authService.getEmailFormToken();
  }

  displayTodoDetails(todo: Todo) {
    this.selectedTodo = todo;
  }

  setActiveNavItem(navItem: string) {
    this.activeNavItem = navItem;
    switch (navItem) {
      case 'Today':
        this.loadTodos();
        break;
      case 'Completed':
        this.loadTodosCompleted();
        break;
      case 'Remaining':
        this.loadRemainingTodos();
        break;
      default:
      // Handle other cases or fallback
    }
  }
  loadRemainingTodos() {
    this.email = this.getEmailFormLocalStorage();
    this.service
      .getTodoRemaining(this.currentPage - 1, this.pageSize, this.email)
      .subscribe((response: any) => {
        this.todos = response.content;
        console.log('todos', this.todos);
        this.totalItems = response.totalElements;
      });
  }

  loadTodosCompleted() {
    this.email = this.getEmailFormLocalStorage();
    this.service
      .getTodoCompleted(this.currentPage - 1, this.pageSize, this.email)
      .subscribe((response: any) => {
        this.todos = response.content;
        console.log('todos', this.todos);
        this.totalItems = response.totalElements;
      });
  }

  // modify action active todo
  action(type: string) {
    if (type === 'Today') {
      this.loadTodos();
    } else if (type === 'Completed') {
      this.loadTodosCompleted();
    } else {
      this.loadRemainingTodos();
    }
  }
}
