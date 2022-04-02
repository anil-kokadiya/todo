import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-update',
  templateUrl: './todo-update.component.html',
  styleUrls: ['./todo-update.component.css'],
})
export class TodoUpdateComponent implements OnInit {
  toDoId: number = 0;
  todo: any = [];
  todoStatusPending: boolean = false;
  todoStatusCompleted: boolean = false;
  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.toDoId = history.state[0];
    this.getTodoData();
  }

  getTodoData() {
    this.todoService.getSingleTodo(this.toDoId).subscribe((data) => {
      this.todo = data;
      if (this.todo.TASK_STATUS == 'Pending') {
        this.todoStatusPending = true;
      } else if (this.todo.TASK_STATUS == 'Completed') {
        this.todoStatusCompleted = true;
      }
      this.todo.TASK_DUE = this.todoService.convertStringToDateObject(this.todo.TASK_DUE);
      console.log(this.todo);
    });
  }

  todoUpdate() {
    this.todo.TASK_DUE = this.todoService.converDateObjectToString(
      this.todo.TASK_DUE,
      'DDMMYYYY',
      '-'
    );
    this.todoService.updateTodoEntry(this.todo).subscribe((data) => {
      console.log('UPDATE SUCCESSFULLY', data);
      this.router.navigateByUrl("/");
    });
  }
}
