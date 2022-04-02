import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoSingleComponent } from './components/todo-single/todo-single.component';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'todo/update', component: TodoComponent },
  { path: 'todo/:id', component: TodoSingleComponent },
  { path: 'todo/update/:id', component: TodoUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
