import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './components/todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { HomeComponent } from './components/home/home.component';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
// khai báo các module cần thiết cho ứng dụng
@NgModule({
  declarations: [AppComponent, TodoComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // Import PrimeNG modules
    ButtonModule,
    TableModule,
    CheckboxModule,
    CardModule,
    InputTextModule,
    CalendarModule,

    // Import Angular forms module
    FormsModule,
    DataViewModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
