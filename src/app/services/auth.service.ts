import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionKey = 'user'; // Clave para almacenar el usuario en sessionStorage

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    // Implementar la lógica de autenticación aquí
    if (username === 'test' && password === 'test') {
      sessionStorage.setItem(this.sessionKey, JSON.stringify({ username })); // Guarda el usuario en sessionStorage
      this.router.navigate(['/home']);
      return true;
    }
    return false;
  }

  logout(): void {
    sessionStorage.removeItem(this.sessionKey); 
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return sessionStorage.getItem(this.sessionKey) !== null; 
  }
}
