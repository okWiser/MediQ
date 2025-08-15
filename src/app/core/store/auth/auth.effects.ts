import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map(response => AuthActions.loginSuccess({ 
            user: response.user, 
            token: response.token 
          })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) =>
        this.authService.register({
          email: action.email,
          password: action.password,
          name: action.name,
          role: action.role
        }).pipe(
          map(response => AuthActions.registerSuccess({ 
            user: response.user, 
            token: response.token 
          })),
          catchError(error => of(AuthActions.registerFailure({ error: error.message })))
        )
      )
    )
  );
}
