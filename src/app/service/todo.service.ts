import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Todo } from '../components/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // @Output() todoEmmiter: EventEmitter<any> = new EventEmitter();

  private toDoUrl = 'http://localhost:8000/api/todo';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private httpClient: HttpClient) {}

  getTodos() {
    return this.httpClient
      .get(this.toDoUrl, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  deleteTodoEntry(id: number) {
    const url = `${this.toDoUrl}/${id}`;
    return this.httpClient
      .delete(url, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  addTodoEntry(toDoEntery: Todo): Observable<Todo> {
    return this.httpClient
      .post<Todo>(this.toDoUrl, toDoEntery, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  updateTodoEntry(todo: Todo) {
    return this.httpClient
      .put<Todo>(this.toDoUrl + '/' + todo.TASK_ID, todo, this.httpOptions)
      .pipe(retry(3), catchError(this.httpErrorHandler));
  }

  private httpErrorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(
        'A client side error occurs. The error message is ' + error.message
      );
    } else {
      console.error(
        'An error happened in server. The HTTP status code is ' +
          error.status +
          ' and the error returned is ' +
          error.message
      );
    }

    return throwError('Error occurred. Pleas try again');
  }
}
