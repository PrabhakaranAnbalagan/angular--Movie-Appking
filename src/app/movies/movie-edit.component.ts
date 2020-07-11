import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  FormControl,
  FormArray,
} from '@angular/forms';
//import { debounceTime } from 'rxjs/operators';
import { ToastService } from 'src/service/toastr.service';

import { GenreType } from 'src/models/GenreType';
import { LanguageType } from 'src/models/LanguageType';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from 'src/service/movies.service';
import { IMovie } from 'src/models/IMovie';
import { JsonPipe } from '@angular/common';
import { ObjectUnsubscribedError } from 'rxjs';

//Custom Validator
function DurationValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (
    control.value !== null &&
    (isNaN(control.value) || control.value < 0.0 || control.value > 6.0)
  ) {
    return { durationvalidator: true };
  } else return null;
}

//Custom Validator with Parameters
function RangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (
      control.value !== null &&
      (isNaN(control.value) || control.value < min || control.value > max)
    ) {
      return { rangevalidator: true };
    } else return null;
  };
}

@Component({
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css'],
})
export class MovieEditComponent implements OnInit, OnDestroy {
  movieForm: FormGroup;
  genreTypes = GenreType;
  languageTypes = LanguageType;
  genreTypeOptions = [];
  languageTypeOptions = [];
  movieId: number;
  private sub: any;
  pageTitle: string;
  movie: IMovie;

  //To Add validation in component
  directorMessage: string;
  messageList = {
    required: 'Please enter director name.',
  };

  get writers(): FormArray {
    return <FormArray>this.movieForm.get('writers');
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: MoviesService,
    private toastr: ToastService,
    private router: Router
  ) {
    this.genreTypeOptions = this.ConvertEnumtoArray(this.genreTypes);
    this.languageTypeOptions = this.ConvertEnumtoArray(this.languageTypes);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  ngOnInit(): void {
    this.movieForm = this.formBuilder.group({
      Name: ['', [Validators.required, Validators.minLength(3)]],
      Genre: ['', [Validators.required]],
      Language: ['', [Validators.required]],
      //duration: { value: '', disabled: false }, another way to declare
      Duration: [null, [DurationValidator, Validators.required]],
      StarRating: [null, [RangeValidator(1, 10), Validators.required]],
      Director: ['', [Validators.required]],
      writers: this.formBuilder.array([this.buildWriter()]),
      ReleaseDate: ['', [Validators.required]],
      ImdbLink: ['', [Validators.required]],
      WikiLink: ['', [Validators.required]],
      ImageUrl: ['', [Validators.required]],
      AvailableInAmazon: false,
      AvailableInNetflix: false,
      AvailableInHotstar: false,
    });

    //to get the Id value we use observable type
    this.sub = this.route.paramMap.subscribe(
      (data) => (this.movieId = +data.get('id'))
    );

    //validate Movie name using valuecahnges
    // to check the value change so we can delay the validation
    const directorControl = this.movieForm.get('Director');
    directorControl.valueChanges.subscribe((data) =>
      this.setMessage(directorControl)
    );

    //NOTE: to delay validation
    // this.movieForm
    //   .get('imbdLink')
    //   .valueChanges.pipe(debounceTime(1000))
    //   .subscribe();

    this.pageTitle = this.movieId !== 0 ? 'Edit a Movie' : 'Add a Movie';
    //Service call to get data to populate Edit Screen
    this.service.GetMovieDetailsById(this.movieId).subscribe(
      (successOrnext) => {
        this.displayMovieDetails(successOrnext);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  displayMovieDetails(movie: IMovie) {
    if (this.movieForm) {
      this.movieForm.reset();
    }
    this.movie = movie;
    //Update the Form Data
    this.movieForm.patchValue({
      Name: movie.Name,
      Genre: movie.Genre,
      Language: movie.Language,
      Duration: movie.Duration,
      StarRating: movie.StarRating,
      Director: movie.Director,
      ReleaseDate: movie.ReleaseDate,
      ImdbLink: movie.ImdbLink,
      WikiLink: movie.WikiLink,
      ImageUrl: movie.ImageUrl,
      AvailableInAmazon: movie.AvailableInAmazon,
      AvailableInNetflix: movie.AvailableInNetflix,
      AvailableInHotstar: movie.AvailableInHotstar,
    });
    this.movieForm.setControl(
      'writers',
      this.formBuilder.array(
        movie.Writers?.split(',').map((x) =>
          this.formBuilder.control(x, [Validators.required])
        ) || [''].map((x) => this.formBuilder.control(x, [Validators.required]))
      )
    );
  }

  addWriter(): void {
    this.writers.push(this.buildWriter());
  }
  deleteWriter(index: number): void {
    this.writers.removeAt(index);
    this.writers.markAsDirty();
  }

  buildWriter(): FormControl {
    return this.formBuilder.control('', [Validators.required]);
  }

  deleteMovie() {
    if (this.movie.Id === 0) {
      // Don't delete, it was never saved.
      this.movieForm.reset();
      this.router.navigate(['/movies']);
    } else {
      if (confirm(`Really delete the Movie: ${this.movie.Name}?`)) {
        this.service.deleteMovie(this.movie.Id).subscribe({
          next: () => this.onSaveComplete("Movie Deleted Successfully..."),
          error: (err) => console.log(err),
        });
      }
    }
  }

  setMessage(control: AbstractControl): void {
    this.directorMessage = '';
    if ((control.touched || control.dirty) && control.errors) {
      this.directorMessage = Object.keys(control.errors)
        .map((key) => this.messageList[key])
        .join('');
    }
  }

  ConvertEnumtoArray(enumObj: any): any[] {
    return Object.keys(enumObj).filter((element) => !isNaN(Number(element)));
  }

  save() {
    if (this.movieForm.valid) {
      if (this.movieForm.dirty) {
        const movieVal = Object.assign(
          {},
          { ...this.movie, ...this.movieForm.value },
          { Writers: this.movieForm.get('writers').value.toString() }
        );

        delete movieVal.writers;

        if (movieVal.Id === 0) {
          this.service.CreateMovie(movieVal).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => console.log(err),
          });
          //console.log(JSON.stringify(movieVal));
        } else {
          this.service.UpdateMovieById(movieVal).subscribe({
            next: () => this.onSaveComplete(),
            error: (err) => console.log(err),
          });
        }
      } else {
        this.movieForm.reset();
        this.router.navigate(['/movies']);
      }
    } else {
      this.toastr.Error('Error','Please correct the validation errors.');
    }
  }

  onSaveComplete(message: string = 'Movie Details saved...'): void {
    // Reset the form to clear the flags
    this.movieForm.reset();
    this.router.navigate(['/movies']);
    this.toastr.Success('', message);
  }
}
