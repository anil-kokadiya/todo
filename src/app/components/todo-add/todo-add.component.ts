import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from 'src/app/service/todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html',
  styleUrls: ['./todo-add.component.css'],
})
export class TodoAddComponent extends NgbDateParserFormatter implements OnInit {
  readonly DELIMITER = '/';
  parse(value: string): NgbDateStruct {
    let result: NgbDateStruct = {
      day: 1,
      month: 11,
      year: 2021,
    };
    if (value) {
      let date = value.split(this.DELIMITER);
      if (date.length == 3 && date[2].length == 4) {
        result = {
          day: parseInt(date[0], 10),
          month: parseInt(date[1], 10),
          year: parseInt(date[2], 10),
        };
      }
    }
    return result;
  }
  /**
   * Function is used for the date format
   */
  format(date: NgbDateStruct): string {
    let result: string = '';
    if (date) {
      result =
        date.day + this.DELIMITER + date.month + this.DELIMITER + date.year;
    }
    return result;
  }

  isShowTaskForm: boolean = false;
  @Output() todoViewEmitter: EventEmitter<Todo> = new EventEmitter();
  todo: any = {
    TASK_NAME: '',
    TASK_DESC: '',
    TASK_DUE: '',
    TASK_STATUS: 'Pending',
  };
  constructor(private todoService: TodoService) {
    super();
  }

  ngOnInit(): void {}

  showTaskForm() {
    if (this.isShowTaskForm) {
      this.isShowTaskForm = false;
    } else {
      this.isShowTaskForm = true;
    }
  }

  addNewTask() {
    console.log('Here');
    this.todo.TASK_DUE = this.todoService.converDateObjectToString(
      this.todo.TASK_DUE,
      'DDMMYYYY',
      '/'
    );
    console.log('ADD TODO : ', this.todo);
    this.todoViewEmitter.emit(this.todo);
    this.createTask();
  }

  createTask() {
    this.todoService.addTodoEntry(this.todo).subscribe((data) => {
      console.log('ADDED : ', data);
      this.clearTaskForm();
    });
  }

  clearTaskForm() {
    this.todo = {
      TASK_NAME: '',
      TASK_DESC: '',
      TASK_DUE: '',
      TASK_STATUS: 'Pending',
    };
    this.isShowTaskForm = false;
    window.location.reload();
  }
}
