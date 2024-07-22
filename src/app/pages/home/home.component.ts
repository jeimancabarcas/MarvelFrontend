import { Component } from '@angular/core';
import { ComicsListComponent } from '../../shared/components/comics-list/comics-list.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ComicsListComponent],
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
}
