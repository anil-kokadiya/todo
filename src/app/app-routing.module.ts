import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoSingleComponent } from './components/todo-single/todo-single.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'todo/:id', component: TodoSingleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
