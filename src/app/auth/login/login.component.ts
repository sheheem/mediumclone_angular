import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackendErrorComponent } from 'src/app/shared/components/backend-error/backend-error.component';
import { selectIsLoading, selectIsSubmitting, selectValidationError } from '../store/reducer';
import { combineLatest } from 'rxjs';
import { LoginRequestInterface } from '../types/loginRequest.interface';
import { authActions } from '../store/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [BackendErrorComponent, CommonModule, RouterLink, ReactiveFormsModule]
})
export class LoginComponent {

  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  isLoading$ = this.store.select(selectIsLoading);

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationError)
  })

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    console.log('form', this.form.getRawValue());
    const request: LoginRequestInterface = {
      user: this.form.getRawValue()
    }
    this.store.dispatch(authActions.login({request}))
  }

}
