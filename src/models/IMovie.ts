import { GenreType } from './GenreType';
import { LanguageType } from './LanguageType';

export interface IMovie {
  Id: number;
  Name: string;
  Genre: GenreType;
  Language: LanguageType;
  Duration: number;
  StarRating: number
  Director: string;
  Writers: string;
  ReleaseDate: string;
  ImdbLink: string;
  WikiLink: string;
  ImageUrl: string;
  AvailableInAmazon: boolean;
  AvailableInNetflix: boolean;
  AvailableInHotstar: boolean;
}
