import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleTodoComponent } from './components/single-todo/single-todo.component';
import { TodoComponent } from './components/todo/todo.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'todo/:id', component: SingleTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
