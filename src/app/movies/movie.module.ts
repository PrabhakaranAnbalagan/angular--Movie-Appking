import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MovieListComponent } from './movie-list.component';
import { MovieDetailsComponent } from './movie-details.component';
import { RouterModule } from '@angular/router';
import { MovieDetailsGuard } from './movie-details.guard';
import { SharedModule } from '../shared/shared.module';
// import { MovieAddComponent } from './movie-add.component';
import { MovieEditComponent } from './movie-edit.component';
import { MovieEditGuard } from './movie-edit.guard';

@NgModule({
  declarations: [MovieListComponent, MovieDetailsComponent, MovieEditComponent], //MovieAddComponent,
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'movies', component: MovieListComponent },
      // { path: 'add', component: MovieAddComponent },
      {
        path: 'movies/:id',
        component: MovieDetailsComponent,
        canActivate: [MovieDetailsGuard],
      },
      {
        //Add a movie
        path: 'movies/0/edit',
        component: MovieEditComponent,
        canDeactivate: [MovieEditGuard],
      },
      {
        path: 'movies/:id/edit',
        component: MovieEditComponent,
        canDeactivate: [MovieEditGuard],
      },
    ]),
    ReactiveFormsModule,
  ],
})
export class MovieModule {}
