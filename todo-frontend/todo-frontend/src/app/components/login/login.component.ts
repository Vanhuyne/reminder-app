import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  passwordFieldType: string = 'password';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
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

  togglePasswordVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }
}
