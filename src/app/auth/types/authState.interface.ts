import { BackendErrorResponse } from "src/app/shared/types/backendError.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";

export interface AuthStateInteface {
    isSubmitting: boolean;
    isLoading: boolean;
    currentUser: CurrentUserInterface | null | undefined;
    validationError: BackendErrorResponse | null;
}