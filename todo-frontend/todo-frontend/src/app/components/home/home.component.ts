import { Component, OnInit, ViewChild } from '@angular/core';
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
  newTodoDueDate: string = '';

  constructor(private service: TodoService) {}
  ngOnInit() {
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

      // close the modal
      this.closeModal();
    });
  }
  closeModal() {
    const modal = document.getElementById('exampleModal');
    const backdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modal != null && backdrop != null) {
      modal.style.display = 'none';
      backdrop.remove();
    }
  }

  // fetch all todos
  loadTodos() {
    this.service.getAllTodos().subscribe((todos) => {
      this.todos = todos.content;
      console.log('todos', todos);
    });
  }

  // action delete todo
  deleteTodo(todoId: number) {
    this.service.deleteTodoById(todoId).subscribe(
      () => {
        console.log('Todo deleted successfully');
        // After deleting the todo, reload the todos
        this.loadTodos();
      },
      (error) => {
        console.error('Error deleting todo:', error);
      }
    );
  }
}
