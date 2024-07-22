import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comic } from '../../../models/marvelApi.model';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrls: ['./comics-list.component.scss']
})
export class ComicsListComponent {
  @Input() listTitle = 'Listado de Comics';
  @Input() comics: Comic[]= [];
  @Input() loading = true;
  @Input() validateIsFavorite = (comic: Comic) => false;
  @Output() addToFavoriteEmitter: EventEmitter<Comic> = new EventEmitter<Comic>();

  onToggleFavorite(comic: Comic) {
    this.addToFavoriteEmitter.emit(comic);
  }

}
