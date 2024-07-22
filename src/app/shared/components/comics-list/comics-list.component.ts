import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MarvelService } from '../../../services/marvel.service';
import { Comic } from '../../../models/marvelApi.model';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent implements OnInit, OnDestroy {
  comics: Comic[] = [];
  loading = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private marvelService: MarvelService) {
    this.subscriptions.add(
      this.marvelService.comics$.subscribe((comics: Comic[]) => {
        this.comics = comics;
      })
    );
  }

  ngOnInit(): void {
    if (this.comics.length === 0) {
      this.marvelService.getComics().subscribe({
        next: (response) => { 
          this.marvelService.setComics(response.data.results)
          this.loading = false;
        },
        error: (err) => {
          console.error('Failed to load comics:', err);
          this.loading = false;
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
