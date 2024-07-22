import { Component, Input } from '@angular/core';
import { Comic } from '../../../models/marvelApi.model';

@Component({
  selector: 'app-comic-detail',
  templateUrl: './comic-detail.component.html',
  styleUrl: './comic-detail.component.scss'
})
export class ComicDetailComponent {
  @Input() comic!: Comic;
}
