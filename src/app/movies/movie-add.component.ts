// import { Component, OnInit } from '@angular/core';
// import {
//   FormGroup,
//   FormBuilder,
//   Validators,
//   AbstractControl,
//   ValidatorFn,
//   FormControl,
//   FormArray,
// } from '@angular/forms';
// //import { debounceTime } from 'rxjs/operators';

// import { GenreType } from 'src/models/GenreType';
// import { LanguageType } from 'src/models/LanguageType';

// //Custom Validator
// function DurationValidator(
//   control: AbstractControl
// ): { [key: string]: boolean } | null {
//   if (
//     control.value !== null &&
//     (isNaN(control.value) || control.value < 0.0 || control.value > 6.0)
//   ) {
//     return { durationvalidator: true };
//   } else return null;
// }

// //Custom Validator with Parameters
// function RangeValidator(min: number, max: number): ValidatorFn {
//   return (control: AbstractControl): { [key: string]: boolean } | null => {
//     if (
//       control.value !== null &&
//       (isNaN(control.value) || control.value < min || control.value > max)
//     ) {
//       return { rangevalidator: true };
//     } else return null;
//   };
// }

// @Component({
//   templateUrl: './movie-add.component.html',
//   styleUrls: ['./movie-add.component.css'],
// })
// export class MovieAddComponent implements OnInit {
//   movieForm: FormGroup;
//   genreTypes = GenreType;
//   languageTypes = LanguageType;
//   genreTypeOptions = [];
//   languageTypeOptions = [];

//   //To Add validation in component
//   directorMessage: string;
//   messageList = {
//     required: 'Please enter director name.',
//   };

//   get writers(): FormArray {
//     return <FormArray>this.movieForm.get('writers');
//   }

//   constructor(private formBuilder: FormBuilder) {
//     this.genreTypeOptions = this.ConvertEnumtoArray(this.genreTypes);
//     this.languageTypeOptions = this.ConvertEnumtoArray(this.languageTypes);
//   }

//   ngOnInit(): void {
//     this.movieForm = this.formBuilder.group({
//       movieName: ['', [Validators.required, Validators.minLength(3)]],
//       genre: ['', [Validators.required]],
//       language: ['', [Validators.required]],
//       //duration: { value: '', disabled: false }, another way to declare
//       duration: [null, [DurationValidator, Validators.required]],
//       starRating: [null, [RangeValidator(1, 10), Validators.required]],
//       director: ['', [Validators.required]],
//       writers: this.formBuilder.array([this.buildWriter()]),
//       releaseDate: ['', [Validators.required]],
//       imbdLink: ['', [Validators.required]],
//       wikiLink: ['', [Validators.required]],
//       imgUrl: ['', [Validators.required]],
//       availableInAmazon: false,
//       availableInNetflix: false,
//       availableInHotstar: false,
//     });

//     //validate Movie name using valuecahnges
//     // to check the value change so we can delay the validation
//     const directorControl = this.movieForm.get('director');
//     directorControl.valueChanges.subscribe((data) =>
//       this.setMessage(directorControl)
//     );

//     //NOTE: to delay validation
//     // this.movieForm
//     //   .get('imbdLink')
//     //   .valueChanges.pipe(debounceTime(1000))
//     //   .subscribe();
//   }

//   addWriter(): void {
//     this.writers.push(this.buildWriter());
//   }

//   buildWriter(): FormControl {
//     return this.formBuilder.control('', [Validators.required]);
//   }

//   populateTestData() {}

//   setMessage(control: AbstractControl): void {
//     this.directorMessage = '';
//     if ((control.touched || control.dirty) && control.errors) {
//       this.directorMessage = Object.keys(control.errors)
//         .map((key) => this.messageList[key])
//         .join('');
//     }
//   }

//   ConvertEnumtoArray(enumObj: any): any[] {
//     return Object.keys(enumObj).filter((element) => !isNaN(Number(element)));
//   }

//   save() {}
// }
