import { Component } from '@angular/core';
import { ComicsListComponent } from '../../shared/components/comics-list/comics-list.component';
import { Comic } from '../../models/marvelApi.model';
import { Subscription } from 'rxjs';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listTitle = 'Listado de Comics';
  comics: Comic[]= [];
  favorites: Comic[] = [];
  loading = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private marvelService: MarvelService) {
    this.subscriptions.add(
      this.marvelService.comics$.subscribe((comics: Comic[]) => {
        this.comics = comics;
      })
    );

    this.subscriptions.add(this.marvelService.getFavorites().subscribe({
      next: (comics) => {
        this.favorites = comics;
      },
      error: (err) => { 
        console.error('Error loading favorites:', err);
        this.loading = false; 
      }
    }));
  }

  ngOnInit(): void {
    this.loading = true;
    this.marvelService.getComics().subscribe({
      complete: () => {
        this.loading = false; 
      }
    });
  }

  validateIsFavorite = (comic: Comic): boolean => {
    return this.favorites.some((favorite) => comic.id === favorite.id)
  }

  onToggleFavorite(comic: Comic) {
    this.marvelService.toggleFavorite(comic)
      .catch(err => console.error('Error al actualizar favoritos:', err));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
