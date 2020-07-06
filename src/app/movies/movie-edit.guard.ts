import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { MovieEditComponent } from './movie-edit.component';
import { toUnicode } from 'punycode';

@Injectable({
  providedIn: 'root',
})
export class MovieEditGuard implements CanDeactivate<MovieEditComponent> {
  canDeactivate(
    component: MovieEditComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.movieForm.dirty) {
      const movieName =
        component.movieForm.get('Name').value || 'New Movie';
      return confirm(`Navigate away and will lose all changes to ${movieName}`);
    }
    return true;
  }
}
