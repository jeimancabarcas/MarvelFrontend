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
  @Output() openDetailEmitter: EventEmitter<Comic> = new EventEmitter<Comic>();
  @Output() addToFavoriteEmitter: EventEmitter<Comic> = new EventEmitter<Comic>();

  onToggleFavorite(comic: Comic, event: MouseEvent): void {
    event.stopPropagation();
    this.addToFavoriteEmitter.emit(comic);
  }

  openDetail(comic: Comic) {
    this.openDetailEmitter.emit(comic);
  }

}
