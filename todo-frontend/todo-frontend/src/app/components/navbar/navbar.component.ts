import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  email: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.email = this.authService.getEmailFormToken();
  }

  logout(): void {
    this.authService.logout();
  }
}
