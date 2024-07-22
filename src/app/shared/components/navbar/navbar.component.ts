import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [RouterModule],
  standalone: true
})
export class NavbarComponent {
  constructor(private authService: AuthService){}

  signOut(){
    this.authService.logout()
  }
}
