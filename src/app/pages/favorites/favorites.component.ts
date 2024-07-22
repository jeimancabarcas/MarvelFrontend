import { Component, Input } from '@angular/core';
import { ComicsListComponent } from '../../shared/components/comics-list/comics-list.component';
import { Comic } from '../../models/marvelApi.model';
import { Subscription } from 'rxjs';
import { MarvelService } from '../../services/marvel.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  listTitle = 'Mis Favoritos';
  favorites: Comic[] = [];
  loading = true;
  private subscriptions: Subscription = new Subscription();

  constructor(private marvelService: MarvelService) {

    this.subscriptions.add(this.marvelService.getFavorites().subscribe({
      next: (comics) => {
        this.favorites = comics;
        this.loading = false; 
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
