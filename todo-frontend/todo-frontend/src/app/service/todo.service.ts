import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Todo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private baseUrl = 'http://localhost:8080/api/todos';
  constructor(private http: HttpClient) {}

  getAllTodos(
    pageNo: number,
    pageSize: number,
    sortBy: string
  ): Observable<any> {
    const pageUrl = `${this.baseUrl}?page=${pageNo}&size=${pageSize}&sortBy=${sortBy}`;
    return this.http.get<any>(pageUrl);
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
