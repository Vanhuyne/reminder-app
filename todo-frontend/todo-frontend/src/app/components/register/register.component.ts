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
  errorMessage: any;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  register() {
    throw new Error('Method not implemented.');
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
}
