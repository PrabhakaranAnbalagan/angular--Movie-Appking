import { Injectable } from '@angular/core';
import { IMovie } from 'src/models/IMovies';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl: string = 'http://api.appking.online/movies';
  constructor(private http: HttpClient) {}

  GetMoviesList(): Observable<IMovie[]> {
    return this.http.get<IMovie[]>(this.baseUrl);
  }

  GetMovieDetailsById(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(this.baseUrl + '/' + id);
  }
}

//OLD Code
// return [
//   {
//     Id: 1,
//     Name: 'Wonder',
//     Genre: GenreType.Family,
//     Language: LanguageType.English,
//     Duration: 1.53,
//     StarRating: 7.5,
//     Director: 'aaa',
//     Writers: 'aaa',
//     ReleaseDate: 'aaa',
//     ImdbLink: 'aaa',
//     WikiLink: 'aaa',
//     ImageUrl: 'assets/images/Wonder.jpg',
//     AvailableInAmazon: true,
//     AvailableInNetflix: false,
//     AvailableInHotstar: false,
//   },
//   {
//     Id: 1,
//     Name: 'Batman Begins',
//     Genre: GenreType.Action,
//     Language: LanguageType.English,
//     Duration: 2.2,
//     StarRating: 8,
//     Director: 'aaa',
//     Writers: 'aaa',
//     ReleaseDate: 'aaa',
//     ImdbLink: 'aaa',
//     WikiLink: 'aaa',
//     ImageUrl: 'assets/images/batmanBegins.jpg',
//     AvailableInAmazon: true,
//     AvailableInNetflix: false,
//     AvailableInHotstar: false,
//   },
// ];
