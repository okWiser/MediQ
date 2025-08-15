import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  // Placeholder for actual API calls
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap((action) => {
        // This would be replaced with actual API call
        return of(AuthActions.loginSuccess({ 
          user: { id: 1, email: action.email, name: 'Test User', role: 'patient' }, 
          token: 'mock-jwt-token' 
        }));
      }),
      catchError((error) => of(AuthActions.loginFailure({ error: error.message })))
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap((action) => {
        // This would be replaced with actual API call
        return of(AuthActions.registerSuccess({ 
          user: { id: 2, email: action.email, name: action.name, role: action.role }, 
          token: 'mock-jwt-token' 
        }));
      }),
      catchError((error) => of(AuthActions.registerFailure({ error: error.message })))
    )
  );
}
