import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  newTodo: any = [];
  constructor() {}

  ngOnInit(): void {}

  passTodoEmit(todo: Todo) {
    this.newTodo = todo;
    console.log('EMITTED : ', this.newTodo);
  }
}
