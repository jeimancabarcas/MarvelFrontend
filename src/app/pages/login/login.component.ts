import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  errorMessage: string = '';
  email!: string;
  password!: string;

  constructor(private authService: AuthService) {}

  submit() {
    this.authService.login(this.email, this.password)
    .catch((error) => {
      this.errorMessage = error.message;
    });;
  }
}
