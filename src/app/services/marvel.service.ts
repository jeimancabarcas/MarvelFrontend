import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, retry } from 'rxjs';
import CryptoJS from 'crypto-js';
import { Comic, MarvelApiResponse } from '../models/marvelApi.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  private publicKey = '3744d561cb1d4e38fde56b895dd3fc6c';
  private privateKey = '1b95ef09abf62edd788c220f42fed1e00d1071a2';
  private apiUrl = 'https://gateway.marvel.com:443/v1/public/comics';

  private comicsSubject = new BehaviorSubject<Comic[]>([]);
  public comics$ = this.comicsSubject.asObservable();
  public loading = false;

  constructor(private http: HttpClient) {}

  getComics(): void {
    this.loading = true;
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + this.privateKey + this.publicKey).toString();
    const year = new Date().getFullYear();
    const dateRange = `${year}-01-01,${year}-12-31`;
    const url = `${this.apiUrl}?ts=${ts}&apikey=${this.publicKey}&hash=${hash}&dateRange=${dateRange}`;
    this.http.get<any>(url).pipe(
      catchError(err => {
        console.error('Error fetching comics:', err);
        this.loading = false;
        return of([]);
      })
    ).subscribe({
      next: (data) => {
        this.comicsSubject.next(data.data.results);
        this.loading = false;
      }
    });
  }
  
}
