import {createFeature, createReducer, on} from '@ngrx/store';
import {AuthStateInteface} from '../types/authState.interface';
import {authActions} from './actions';
import { routerNavigationAction } from '@ngrx/router-store';

const initialState: AuthStateInteface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationError: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationError: null,
    })),
    on(authActions.registerSuccess, (state, action) => ({
      ...state,
      isSubmitting: false,
      currentUser: action.currentUser,
    })),
    on(authActions.registerFailure, (state, action) => ({
      ...state,
      isSubmitting: false,
      validationError: action.errors,
    })),

    on(authActions.login, (state) => ({
      ...state,
      isLoading: true,
      validationError: null,
    })),
    on(authActions.loginSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.loginFailure, (state, action) => ({
      ...state,
      isLoading: false,
      validationError: action.errors,
    })),
    on(routerNavigationAction, (state) => ({...state, validationError: null}))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectValidationError,
  selectIsLoading,
} = authFeature;
