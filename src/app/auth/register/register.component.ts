import {Component} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {authActions} from '../store/actions';
import {RegisterUserInterface} from '../types/registerRequest.interface';
import {selectIsLoading, selectIsSubmitting, selectValidationError} from '../store/reducer';
import {AuthStateInteface} from '../types/authState.interface';
import {CommonModule} from '@angular/common';
import {AuthService} from '../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorComponent } from "../../shared/components/backend-error/backend-error.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, BackendErrorComponent, RouterLink],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  
  isLoading$ = this.store.select(selectIsLoading);

 data$ = combineLatest({
  isSubmitting: this.store.select(selectIsSubmitting),
  backendErrors: this.store.select(selectValidationError)
 })

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private authService: AuthService
  ) {}

  onSubmit() {
    console.log(this.form.getRawValue());
    const request: RegisterUserInterface = {
      user: {...this.form.getRawValue()},
    };
    this.store.dispatch(authActions.register({request}));
    // this.authService.register(request).subscribe(res => console.log(res)
    // );
  }
}
