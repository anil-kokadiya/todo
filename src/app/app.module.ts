import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './components/todo/todo.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';
import { TodoViewComponent } from './components/todo-view/todo-view.component';
import { TodoSingleComponent } from './components/todo-single/todo-single.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoAddComponent } from './components/todo-add/todo-add.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { allIcons } from 'ngx-bootstrap-icons';
import { TodoUpdateComponent } from './components/todo-update/todo-update.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HeaderComponent,
    FooterComponent,
    TodoViewComponent,
    TodoSingleComponent,
    TodoAddComponent,
    TodoUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    NgxBootstrapIconsModule.pick(allIcons),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
