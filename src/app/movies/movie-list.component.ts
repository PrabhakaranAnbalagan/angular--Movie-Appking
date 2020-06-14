import { Component, OnInit } from '@angular/core';
import { IMovie } from 'src/models/IMovies';
import { GenreType } from 'src/models/GenreType';
import { LanguageType } from 'src/models/LanguageType';
import { MoviesService } from 'src/service/movies.service';

@Component({
  //selector: 'ak-movies', NOTE: not reqired after Router change
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  constructor(private moviesService: MoviesService) {
    console.log('calling check');
  }

  title: string = 'Movie List';
  Genres = GenreType;
  Languages = LanguageType;

  imageWidth: number = 50;
  imageMargin: number = 2;

  showImage = false;

  private _filterText: string;

  get filterText(): string {
    return this._filterText;
  }

  set filterText(value: string) {
    this._filterText = value;
    this.filteredMovies = this.filterText
      ? this.GetFilteredMovies(this.filterText)
      : this.movies;
  }

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  movies: IMovie[];

  filteredMovies: IMovie[];

  toogleImage(): void {
    this.showImage = !this.showImage;
  }

  GetFilteredMovies(filterText: string): IMovie[] {
    return this.movies.filter(
      (movie) =>
        movie.Name.toLowerCase().indexOf(filterText.toLowerCase()) !== -1
    );
  }

  notify(event: Event) {
    //this.title = '';
    this.title = `Movie List ${event}`;
  }

  ngOnInit(): void {
    console.log('on Init method');
    this.moviesService.GetMoviesList().subscribe(
      (successOrnext) => {
        this.movies = successOrnext;
        this.filteredMovies = this.movies;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
