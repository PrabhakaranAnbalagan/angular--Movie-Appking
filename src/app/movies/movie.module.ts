import { NgModule } from '@angular/core';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailsComponent } from './movie-details.component';
import { RouterModule } from '@angular/router';
import { MovieDetailsGuard } from './movie-details.guard';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MovieListComponent, MovieDetailsComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'movies', component: MovieListComponent },
      {
        path: 'movies/:id',
        component: MovieDetailsComponent,
        canActivate: [MovieDetailsGuard],
      },
    ]),
  ],
})
export class MovieModule {}
