import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { AuthActions } from '../../../core/store/auth/auth.actions';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>MediQ Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="demo-info">
            <p><strong>Demo Credentials:</strong></p>
            <p>Patient: patient&#64;mediq.com / demo123</p>
            <p>Doctor: doctor&#64;mediq.com / demo123</p>
            <p>Admin: admin&#64;mediq.com / demo123</p>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Role</mat-label>
              <mat-select formControlName="role" required>
                <mat-option value="patient">Patient</mat-option>
                <mat-option value="doctor">Doctor</mat-option>
                <mat-option value="admin">Admin</mat-option>
              </mat-select>
            </mat-form-field>
            
            <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="isLoading">
              {{isLoading ? 'Logging in...' : 'Login'}}
            </button>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 20px;
    }
    .login-card {
      width: 100%;
      max-width: 400px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .demo-info {
      background-color: #f5f5f5;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 12px;
    }
    .demo-info p {
      margin: 4px 0;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;

  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['patient@mediq.com', [Validators.required, Validators.email]],
      password: ['demo123', [Validators.required]],
      role: ['patient', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const { email, password, role } = this.loginForm.value;
      
      this.authService.login(email, password, role).subscribe({
        next: (response) => {
          this.store.dispatch(AuthActions.loginSuccess({ 
            user: response.user, 
            token: response.token 
          }));
          
          // Navigate based on role
          const dashboardRoute = `/${role}-dashboard`;
          this.router.navigate([dashboardRoute]);
          
          this.snackBar.open(`Welcome ${response.user.name}!`, 'Close', {
            duration: 3000
          });
          this.isLoading = false;
        },
        error: (error) => {
          this.snackBar.open('Invalid credentials. Please try again.', 'Close', {
            duration: 3000
          });
          this.isLoading = false;
        }
      });
    }
  }
}