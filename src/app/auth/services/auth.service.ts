import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { RegisterUserInterface } from "../types/registerRequest.interface";
import { CurrentUserInterface } from "src/app/shared/types/currentUser.interface";
import { AuthResponseInterface } from "../types/authResponse.interface";
import { map, Observable } from "rxjs";
import { environment } from "src/environments/environment.development";
import { LoginRequestInterface } from "../types/loginRequest.interface";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private readonly http: HttpClient ) {}


    register(data: RegisterUserInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users'
        return this.http.post<AuthResponseInterface>(url, data).pipe(
            map(response => response.user)
        )
    }

    login(data: LoginRequestInterface): Observable<CurrentUserInterface> {
        const url = environment.apiUrl + '/users/login'
        return this.http.post<AuthResponseInterface>(url, data).pipe(
            map(response => response.user)
        )
    }


}