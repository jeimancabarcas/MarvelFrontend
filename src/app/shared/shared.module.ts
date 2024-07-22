import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComicsListComponent } from './components/comics-list/comics-list.component';
import { RouterModule } from '@angular/router';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ComicsListComponent,
    ComicDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    ComicsListComponent,
    ComicDetailComponent
  ]
})
export class SharedModule { }
