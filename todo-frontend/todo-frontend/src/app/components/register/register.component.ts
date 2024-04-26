import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from 'src/app/models/register-request';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roles: [], // Initialize roles as needed
  };
  passwordField1Type: string = 'password';
  passwordField2Type: string = 'password';

  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  register() {
    console.log(this.registerRequest);
    this.authService.register(this.registerRequest).subscribe({
      next: (data) => {
        console.log(data);
        this.successMessage = 'Registration successful';
        this.errorMessage = '';
      },
      error: (error) => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.successMessage = '';
      },
    });
  }

  togglePasswordVisibility(fieldNumber: number): void {
    if (fieldNumber === 1) {
      this.passwordField1Type =
        this.passwordField1Type === 'password' ? 'text' : 'password';
    } else if (fieldNumber === 2) {
      this.passwordField2Type =
        this.passwordField2Type === 'password' ? 'text' : 'password';
    }
  }

  isValidPassword(): boolean {
    return this.registerRequest.password.length < 20; // Adjust as per your requirements
  }

  isValidEmail(): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.registerRequest.email);
  }
}
