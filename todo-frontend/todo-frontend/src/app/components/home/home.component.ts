import { Component, OnInit } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { Todo } from 'src/app/models/todos';
import { HttpClient } from '@angular/common/http';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  todos: Todo[] = [];

  newTodoTitle: string = '';
  newTodoDescription: string = '';
  showAddTodoForm: boolean = false;
  newTodoDueDate: string = '';

  constructor(private service: TodoService) {}
  ngOnInit(): void {
    this.loadTodos();
  }

  addNewTodo() {
    const newTodo: Todo = {
      userId: 1, // chưa có user nên để 4
      title: this.newTodoTitle,
      description: this.newTodoDescription,
      dueDate: this.newTodoDueDate, // You may adjust this according to your requirements
      completed: false, // New todos are initially not completed
    };

    // Call the addTodo method of the TodoComponent
    this.service.addNewTodo(newTodo).subscribe((response) => {
      console.log('response', response);

      this.loadTodos();

      // Reset the form
      this.newTodoTitle = '';
      this.newTodoDescription = '';
      this.newTodoDueDate = '';

      this.showAddTodoForm = false;
    });
  }

  // action show form add todo
  toggleAddTodoForm() {
    this.showAddTodoForm = !this.showAddTodoForm;
  }

  // fetch all todos
  loadTodos() {
    this.service.getAllTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }
}
