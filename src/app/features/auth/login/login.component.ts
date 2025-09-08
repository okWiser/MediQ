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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
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
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="login-container">
      <mat-card class="login-card">
        <mat-card-header>
          <mat-card-title>MediQ Login</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="demo-info">
            <mat-icon>info</mat-icon>
            <div>
              <p><strong>Demo Credentials:</strong></p>
              <p>Patient: patient&#64;mediq.com / demo123</p>
              <p>Doctor: doctor&#64;mediq.com / demo123</p>
              <p>Admin: admin&#64;mediq.com / demo123</p>
            </div>
          </div>
          
          <div class="error-message" *ngIf="errorMessage">
            <mat-icon>error</mat-icon>
            <span>{{errorMessage}}</span>
          </div>
          
          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
                Email is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
                Please enter a valid email
              </mat-error>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password" required>
              <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                Password is required
              </mat-error>
              <mat-error *ngIf="loginForm.get('password')?.hasError('minlength')">
                Password must be at least 6 characters
              </mat-error>
            </mat-form-field>
            

            
            <button mat-raised-button color="primary" type="submit" class="full-width" [disabled]="isLoading || loginForm.invalid">
              <mat-progress-spinner *ngIf="isLoading" diameter="20" mode="indeterminate"></mat-progress-spinner>
              <span *ngIf="!isLoading">Login</span>
              <span *ngIf="isLoading">Logging in...</span>
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
      background-color: #e3f2fd;
      border: 1px solid #2196f3;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      font-size: 12px;
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }
    .demo-info p {
      margin: 4px 0;
    }
    .error-message {
      background-color: #ffebee;
      border: 1px solid #f44336;
      color: #c62828;
      padding: 12px;
      border-radius: 4px;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
    }
    button[disabled] {
      opacity: 0.6;
    }
    mat-progress-spinner {
      display: inline-block;
      margin-right: 8px;
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['patient@mediq.com', [Validators.required, Validators.email]],
      password: ['demo123', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.errorMessage = '';
    
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }
    
    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    const role = this.determineUserRole(email);
    
    // Add timeout to prevent infinite loading
    const loginTimeout = setTimeout(() => {
      if (this.isLoading) {
        this.isLoading = false;
        this.errorMessage = 'Login timeout. Please try again.';
        this.snackBar.open('Login timeout. Please check your connection.', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
      }
    }, 10000);
    
    this.authService.login(email, password, role).subscribe({
      next: (response) => {
        clearTimeout(loginTimeout);
        this.store.dispatch(AuthActions.loginSuccess({ 
          user: response.user, 
          token: response.token 
        }));
        
        const dashboardRoute = `/${role}-dashboard`;
        this.router.navigate([dashboardRoute]);
        
        this.snackBar.open(`Welcome ${response.user.name}!`, 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
        this.isLoading = false;
      },
      error: (error) => {
        clearTimeout(loginTimeout);
        this.isLoading = false;
        
        // Enhanced error handling
        if (error.message.includes('Invalid credentials')) {
          this.errorMessage = 'Invalid email or password. Please check your credentials.';
        } else {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
        
        this.snackBar.open(this.errorMessage, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar']
        });
        
        // Reset form on error
        this.loginForm.get('password')?.setValue('');
      }
    });
  }
  
  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private determineUserRole(email: string): 'patient' | 'doctor' | 'admin' {
    if (email.includes('admin')) return 'admin';
    if (email.includes('doctor') || email.includes('dr.')) return 'doctor';
    return 'patient';
  }
}