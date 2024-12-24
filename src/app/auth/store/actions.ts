import { createAction, createActionGroup, emptyProps, props } from "@ngrx/store";
import { RegisterUserInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { BackendErrorResponse } from "src/app/shared/types/backendError.interface";
import { LoginRequestInterface } from "../types/loginRequest.interface";

// export const register = createAction('[Auth] Register', props<{request: RegisterUserInterface}>());
export const authActions = createActionGroup({
    source: 'auth',
    events: {
        Register: props<{request: RegisterUserInterface}>(),
        'Register Success': props<{currentUser: CurrentUserInterface}>(),
        'Register failure': props<{errors: BackendErrorResponse}>(),

        Login: props<{request: LoginRequestInterface}>(),
        'Login Success': props<{currentUser: CurrentUserInterface}>(),
        'Login failure': props<{errors: BackendErrorResponse}>(),
    }
})