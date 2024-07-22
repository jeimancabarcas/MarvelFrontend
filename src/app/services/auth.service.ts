import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private sessionKey = 'user';

  constructor(private router: Router, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  login(email: string, password: string): Promise<void> {
    return this.afAuth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        sessionStorage.setItem(this.sessionKey, JSON.stringify({ email }));
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.error('Login failed:', error);
        throw error;
      });
  }

  logout(): void {
    this.afAuth.signOut().then(() => {
      sessionStorage.removeItem(this.sessionKey); 
      this.router.navigate(['/login']);
    }).catch((error) => {
      throw new Error(error.message); 
    });
  }

  signUp(name: string, lastName: string, id: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        return this.firestore.collection('users').doc(result.user?.uid).set({
          name: name,
          lastName: lastName,
          id: id,
          email: email
        });
      }).catch((error) => {
        throw new Error(error.message); 
      });
  }

  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }
}
