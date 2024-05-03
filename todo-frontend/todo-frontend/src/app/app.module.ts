import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TodoComponent } from './components/todo/todo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InterceptorInterceptor } from './intercepor/interceptor.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { ToastrModule } from 'ngx-toastr';

// khai báo các module cần thiết cho ứng dụng
@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    RegisterComponent,
    TodoDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbPaginationModule,
    // Import Angular forms module
    FormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    // Add the interceptor to the providers array
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
