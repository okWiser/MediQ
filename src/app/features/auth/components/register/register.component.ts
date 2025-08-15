import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/store';
import { register } from '../../../core/store/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../../core/store/auth/auth.selectors';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  hidePassword = true;
  hideConfirmPassword = true;
  roles = Object.values(UserRole);

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      phoneNumber: ['', [Validators.pattern(/^[0-9]{10,15}$/)]],
      dateOfBirth: ['', [Validators.required]],
      role: [UserRole.PATIENT, [Validators.required]],
      licenseNumber: [''],
      specialization: [''],
      yearsOfExperience: ['']
    }, { validators: this.passwordMatchValidator });

    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.valid) {
      const userData = this.registerForm.value;
      this.store.dispatch(register({ userData }));
    }
  }

  onLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  isDoctor(): boolean {
    return this.registerForm.get('role')?.value === UserRole.DOCTOR;
  }
}
