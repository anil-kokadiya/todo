import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TodoService } from 'src/app/service/todo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
})
export class TodoViewComponent implements OnInit {
  todos: Todo[] = [];
  todo!: Todo;
  constructor(private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    this.getTodoList();
    this.todoService.todoEmmiter.subscribe(() => {
      this.getTodoList();
    });
  }

  getTodoList(isTodoBlank: boolean = false) {
    this.todoService.getTodos().subscribe((data) => {
      if (isTodoBlank) {
        this.todos = [];
      }
      Object.entries(data).forEach((i) => {
        this.todos.push(i[1]);
      });
      console.log('TODO : ', this.todos);
      if (this.todos.length > 0) {
        for (var i = 0; i < this.todos.length; i++) {
          if (this.todos[i].TASK_STATUS == 'Pending') {
            this.todos[i].IS_CHECKED = false;
          } else {
            this.todos[i].IS_CHECKED = true;
          }
        }
      }
    });
  }

  deleteTodo(id: number) {
    this.todoService
      .deleteTodoEntry(id)
      .subscribe((data) => this.getTodoList(true));
  }

  viewTodo(id: number) {
    console.log('VIEW : ', id);
    this.router.navigateByUrl('/todo/', { state: [id] });
  }

  taskStatusChange(id: number) {
    console.log('Status Change : ', id);
    for (var i = 0; i < this.todos.length; i++) {
      if (this.todos[i].TASK_ID == id) {
        this.todo = this.todos[i];
      }
    }
    if (this.todo.TASK_STATUS == 'Pending') {
      this.todo.TASK_STATUS = 'Completed';
    } else {
      this.todo.TASK_STATUS = 'Pending';
    }
    console.log('DATA TO BE UPDATE:', this.todo);
    this.todoService.updateTodoEntry(this.todo).subscribe((data) => {
      console.log('UPDATE SUCCESSFULLY', data);
    });
  }

  updateTodo(id: number) {
    console.log('UPDATE : ', id);
    this.router.navigateByUrl('/todo/update/', { state: [id] });
  }
}
