import { Component } from '@angular/core';
import { Comic } from '../../models/marvelApi.model';
import { Subscription } from 'rxjs';
import { MarvelService } from '../../services/marvel.service';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  listTitle = 'Listado de Comics';
  comics: Comic[]= [];
  favorites: Comic[] = [];
  comicSelected!: Comic;
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
  
  openModal(comic: Comic) {
    const modalElement = document.getElementById('myModal');
    if (modalElement !== null) {
      this.comicSelected = comic;
      const myModal = new Modal(modalElement, {
        keyboard: false
      });
      myModal.show();
    } else {
      console.error('Modal element not found!');
    }
  }
  
  validateIsFavorite = (comic: Comic): boolean => {
    return this.favorites.some((favorite) => comic?.id === favorite.id)
  }

  onToggleFavorite(comic: Comic) {
    this.marvelService.toggleFavorite(comic)
      .catch(err => console.error('Error al actualizar favoritos:', err));
  }

  openDetailModal(comic: Comic){
    this.openModal(comic);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
