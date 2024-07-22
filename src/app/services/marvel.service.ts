import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
import CryptoJS from 'crypto-js';
import { Comic, MarvelApiResponse } from '../models/marvelApi.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private publicKey = environment.marvel.publicKey;
  private privateKey = environment.marvel.privateKey;
  private apiUrl = environment.marvel.apiUrl;

  private comicsSubject = new BehaviorSubject<Comic[]>([]);
  public comics$ = this.comicsSubject.asObservable();

  constructor(private http: HttpClient, private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  getComics(): Observable<Comic[]> {
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();
    const year = new Date().getFullYear();
    const dateRange = `${year}-01-01,${year}-12-31`;
    const url = `${this.apiUrl}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&dateRange=${dateRange}`;
    const cachedComics = localStorage.getItem('comics');
    if (cachedComics) {
      this.comicsSubject.next(JSON.parse(cachedComics));
      return this.comics$;
    } else {
      return this.http.get<MarvelApiResponse>(url).pipe(
        map(response => response.data.results),
        tap(comics => {
          localStorage.setItem('comics', JSON.stringify(comics));
          this.comicsSubject.next(comics);
        })
      );
    }
  }

  setComics(comics: Comic[]) {
    this.comicsSubject.next(comics);
  }

  getFavorites(): Observable<Comic[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection<Comic>(`users/${user.uid}/favorites`).valueChanges();
        } else {
          return of([]);
        }
      })
    );
  }

  toggleFavorite(comic: any) {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const docRef = this.firestore.collection('users').doc(user.uid).collection('favorites', ref => ref.where('id', '==', comic.id));
        return firstValueFrom(docRef.get()).then(docSnapshot => {
          if (!docSnapshot.empty) {
            return this.removeFavorite(user.uid, docSnapshot.docs[0].id).then(() => void 0);
          } else {
            return this.addFavorite(user.uid, comic).then(() => void 0);
          }
        });
      } else {
        throw new Error('No user logged in');
      }
    });
  }

  private addFavorite(userId: string, comic: any) {
    return this.firestore.collection('users').doc(userId).collection('favorites').doc(""+comic.id).set(comic);
  }

  private removeFavorite(userId: string, favId: string) {
    return this.firestore.collection('users').doc(userId).collection('favorites').doc(favId).delete();
  }
}
