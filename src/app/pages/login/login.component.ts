import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  errorMessage: string = '';
  email!: string;
  password!: string;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  submit() {
    this.authService.login(this.email, this.password)
    .catch((error) => {
      this.errorMessage = error.message;
    });;
  }
}
