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

  pageNo: number = 0;
  pageSize = 5;
  sortBy = 'id';
  totalElements = 0;

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
      //console.log('response', response);

      this.loadTodos();
      console.log(this.pageNo);

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
    this.service
      .getAllTodos(this.pageNo, this.pageSize, this.sortBy)
      .subscribe((response: any) => {
        //console.log('response', response);
        this.todos = response.content;
        this.totalElements = response.totalElements;
      });
    console.log(this.pageNo);
  }

  // set page
  onPageChange(event: any) {
    console.log('event', event);
    this.pageNo = event - 1;

    this.service
      .getAllTodos(this.pageNo, this.pageSize, this.sortBy)
      .subscribe((response: any) => {
        this.todos = response.content;
        this.totalElements = response.totalElements;
      });
  }

  // action delete todo
  deleteTodo(todoId: number) {
    this.service.deleteTodoById(todoId).subscribe(
      () => {
        console.log('Todo deleted successfully');

        // After deleting the todo, reload the todos
        if (this.todos.length === 1) {
          this.pageNo = this.pageNo - 1;
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
}
