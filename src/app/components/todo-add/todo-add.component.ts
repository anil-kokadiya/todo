import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TodoService } from 'src/app/service/todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent implements OnInit {
  isShowTaskForm: boolean = false;
  @Output() todoViewEmitter: EventEmitter<Todo> = new EventEmitter();
  todo: any = {
    TASK_NAME: '',
    TASK_DESC: '',
    TASK_DUE: '',
    TASK_STATUS: 'Pending',
  };
  constructor(private todoService: TodoService) {}

  ngOnInit(): void {}

  showTaskForm() {
    if (this.isShowTaskForm) {
      this.isShowTaskForm = false;
    } else {
      this.isShowTaskForm = true;
    }
  }

  addNewTask() {
    var selectedDate = '';
    console.log('Here');
    if (this.todo.TASK_DUE['day'].toString().length === 1) {
      this.todo.TASK_DUE['day'] = '0' + this.todo.TASK_DUE['day'];
    }
    if (this.todo.TASK_DUE['month'].toString().length === 1) {
      this.todo.TASK_DUE['month'] = '0' + this.todo.TASK_DUE['month'];
    }
    this.todo.TASK_DUE['year'] = this.todo.TASK_DUE['year'].toString();
    selectedDate =
      this.todo.TASK_DUE['day'] +
      '/' +
      this.todo.TASK_DUE['month'] +
      '/' +
      this.todo.TASK_DUE['year'];

    this.todo.TASK_DUE = selectedDate;
    console.log('SELECTED DATE : ', selectedDate);
    console.log('ADD TODO : ', this.todo);
    this.todoViewEmitter.emit(this.todo);
    this.clearTaskForm();
  }

  // createTask() {
  //   this.todoService.addTodoEntry(this.todo).subscribe((data) => {
  //     console.log('ADDED : ', data);
  //     this.clearTaskForm();
  //   });
  // }

  clearTaskForm() {
    this.todo = {
      TASK_NAME: '',
      TASK_DESC: '',
      TASK_DUE: '',
      TASK_STATUS: 'Pending',
    };
    this.isShowTaskForm = false;
  }
}