import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './shared/component/pageNotFound.component';
import { MovieModule } from './movies/movie.module';

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CommonModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    HttpClientModule,
    MatSnackBarModule,
    RouterModule.forRoot([

      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ], {useHash: true}), //for server to fix refresh issue
    MovieModule,
    BrowserAnimationsModule,
  ],

  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
  ],
})
export class AppModule {}
