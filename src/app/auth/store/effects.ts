import {inject} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../services/auth.service';
import {authActions} from './actions';
import {switchMap, map, catchError, of, tap} from 'rxjs';
import {CurrentUserInterface} from 'src/app/shared/types/currentUser.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {PersistanceService} from 'src/app/shared/services/persistance.service';
import {Router} from '@angular/router';
import {Action} from 'rxjs/internal/scheduler/Action';

export const registerEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({request}) => {
        return authService.register(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            persistanceService.setToken('medium_token', currentUser.token);
            return authActions.registerSuccess({currentUser});
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              authActions.registerFailure({
                errors: error.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectSuccessEffect = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.registerSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {functional: true, dispatch: false}
);

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authService = inject(AuthService),
    persistanceService = inject(PersistanceService)
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap(({request}) => {
        return authService.login(request).pipe(
          map((curretnUser: CurrentUserInterface) => {
            persistanceService.setToken('medium_token', curretnUser.token);
            return authActions.loginSuccess({currentUser: curretnUser});
          }),
          catchError((error: HttpErrorResponse) => {
            return of(
              authActions.loginFailure({
                errors: error.error.errors,
              })
            );
          })
        );
      })
    );
  },
  {functional: true}
);

export const redirectSuccessEffectLogin = createEffect(
  (action$ = inject(Actions), router = inject(Router)) => {
    return action$.pipe(
      ofType(authActions.loginSuccess),
      tap(() => {
        router.navigateByUrl('/');
      })
    );
  },
  {functional: true, dispatch: false}
);
