import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
})
export class TodoViewComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodoList();
  }

  getTodoList() {
    this.todoService.getTodos().subscribe((data) => {
      Object.entries(data).forEach((i) => {
        this.todos.push(i[1]);
      });
      console.log('TODO : ', this.todos);
    });
  }

  deleteTodo(id: number) {
    this.todoService
      .deleteTodoEntry(id)
      .subscribe((data) => console.log('DELETED : ', data));
  }

  viewTodo(id: number) {
    console.log('VIEW : ', id);
  }
}
