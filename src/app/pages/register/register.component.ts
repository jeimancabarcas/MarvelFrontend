import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  
  errorMessage: string = '';
  identificacion!: string;
  nombre!: string;
  apellido!: string;
  email!: string;
  password!: string;
  confirmPassword!: string;

  constructor(private authService: AuthService, private afAuth: AngularFireAuth, private router: Router) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.router.navigate(['/home']);
      }
    });
  }

  submit() {
    if (this.password === this.confirmPassword) {
      this.authService.signUp(this.nombre, this.apellido, this.identificacion, this.email, this.password)
        .then(() => {
          this.router.navigate(['/login']);
        }).catch((error) => {
          this.errorMessage = error.message; 
        });
    } else {
      this.errorMessage = "Las contraseñas no coinciden"; 
    }
  }
}
