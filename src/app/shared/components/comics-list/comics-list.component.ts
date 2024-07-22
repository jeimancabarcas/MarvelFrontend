import { afterNextRender, afterRender, Component, NgZone, OnInit } from '@angular/core';
import { MarvelService } from '../../../services/marvel.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Comic } from '../../../models/marvelApi.model';

@Component({
  selector: 'app-comics-list',
  templateUrl: './comics-list.component.html',
  styleUrl: './comics-list.component.scss',
})
export class ComicsListComponent {
  comics!: Comic[];
  loading = true
  
  constructor(
    private marvelService: MarvelService,
  ) {
    afterRender({
      write: () => {
        if(this.comics.length == 0) {
        }
      },
    });
    this.marvelService.getComics()
    this.marvelService.comics$.subscribe((response: Comic[]) => {
      this.comics = response;
      this.loading = false;
    });
  }

}
