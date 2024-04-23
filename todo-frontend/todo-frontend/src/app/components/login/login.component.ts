import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  login(): void {
    this.authService.login(this.email, this.password).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/home']);
      },
      (error) => {
        if (error.error.message != null) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage =
            'Email or password is incorrect. Please try again.';
        }
      }
    );
  }

  isValidPassword(): boolean {
    return this.password.length < 20; // Adjust as per your requirements
  }

  isValidEmail(): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
