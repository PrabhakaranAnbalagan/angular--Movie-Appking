import { Injectable } from '@angular/core';
import { IMovie } from 'src/models/IMovie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

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
    if (id === 0) {
      return of(this.initializeMovie());
    }
    return this.http.get<IMovie>(this.baseUrl + '/' + id);
  }

  UpdateMovieById(movie: IMovie): Observable<IMovie> {
    const header = new HttpHeaders({ 'content-Type': 'application/json' });
    const url = this.baseUrl + '/' + movie.Id;
    return this.http.put<IMovie>(url, movie, {
      headers: header,
    });
  }

  CreateMovie(movie: IMovie): Observable<IMovie> {
    const header = new HttpHeaders({ 'content-Type': 'application/json' });
    const url = this.baseUrl;
    return this.http.post<IMovie>(url, movie, {
      headers: header,
    });
  }

  deleteMovie(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<IMovie>(url, { headers });
  }

  private initializeMovie(): IMovie {
    // Return an initialized object
    return {
      Id: 0,
      Name: null,
      Genre: null,
      Language: null,
      Duration: null,
      StarRating: null,
      Director: null,
      Writers: null,
      ReleaseDate: null,
      ImdbLink: null,
      WikiLink: null,
      ImageUrl: null,
      AvailableInAmazon: false,
      AvailableInNetflix: false,
      AvailableInHotstar: false,
    };
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
