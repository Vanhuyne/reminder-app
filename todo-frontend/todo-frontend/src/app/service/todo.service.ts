import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:8080/api/todos';
  constructor(private http: HttpClient) {}

  // getAllTodos(): Observable<Todo[]> {
  //   return this.http.get<Todo[]>(this.baseUrl);
  // }
  getAllTodos(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  getTodoById(todoId: number): Observable<Todo> {
    const url = `${this.baseUrl}/${todoId}`;
    return this.http.get<Todo>(url);
  }
  addNewTodo(newTodo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.baseUrl, newTodo);
  }

  deleteTodoById(todoId: number): Observable<void> {
    const url = `${this.baseUrl}/${todoId}`;
    return this.http.delete<void>(url);
  }

  updateTodoById(id: number, todo: Todo): Observable<Todo> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<Todo>(url, todo);
  }
}
