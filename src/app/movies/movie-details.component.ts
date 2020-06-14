import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/models/IMovies';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/service/movies.service';
import { GenreType } from 'src/models/GenreType';
import { LanguageType } from 'src/models/LanguageType';

@Component({
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  pageTitle = 'Movie Details';
  movie: IMovie;
  movieId: number;
  Genres = GenreType;
  Languages = LanguageType;

  constructor(
    private route: ActivatedRoute,
    private service: MoviesService,
    private router: Router
  ) {
    this.movieId = +route.snapshot.paramMap.get('id'); //+ to convert to int -shortcut
    //console.log(route.url)
  }

  ngOnInit(): void {
    this.service.GetMovieDetailsById(this.movieId).subscribe(
      (successOrnext) => {
        this.movie = successOrnext;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  OnBack() {
    this.router.navigate(['/movies']);
  }
}
