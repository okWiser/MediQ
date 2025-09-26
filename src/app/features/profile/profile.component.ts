import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { LoadingService } from '../../core/services/loading.service';
import { ErrorHandlerService } from '../../core/services/error-handler.service';
import { UserProfile } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, ReactiveFormsModule],
  template: `
    <div class="profile-container" role="main" aria-labelledby="profile-title">
      <h1 id="profile-title">My Profile</h1>
      
      <div class="loading-overlay" *ngIf="isLoading" role="status" aria-label="Loading profile data">
        <mat-spinner></mat-spinner>
      </div>
      
      <div class="profile-grid" *ngIf="userProfile && !isLoading">
        <mat-card class="profile-info-card" role="region" aria-labelledby="profile-info-title">
          <mat-card-header>
            <div class="profile-avatar-large" role="img" [attr.aria-label]="'Profile picture for ' + userProfile.name">
              <mat-icon>account_circle</mat-icon>
            </div>
            <mat-card-title id="profile-info-title">{{userProfile.name}}</mat-card-title>
            <mat-card-subtitle>{{userProfile.role | titlecase}} • {{userProfile.department}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="profile-stats" role="region" aria-label="Profile statistics">
              <div class="stat-item">
                <span class="stat-value" [attr.aria-label]="userProfile.stats.experience + ' years of experience'">{{userProfile.stats.experience}}</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat-item">
                <span class="stat-value" [attr.aria-label]="userProfile.stats.patients + ' patients served'">{{userProfile.stats.patients}}</span>
                <span class="stat-label">Patients Served</span>
              </div>
              <div class="stat-item">
                <span class="stat-value" [attr.aria-label]="'Rating: ' + userProfile.stats.rating">{{userProfile.stats.rating}}</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="profile-details-card" role="region" aria-labelledby="profile-form-title">
          <mat-card-header>
            <mat-card-title id="profile-form-title">Personal Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" novalidate>
              <div class="form-grid">
                <mat-form-field appearance="outline">
                  <mat-label>Full Name *</mat-label>
                  <input matInput formControlName="name" required 
                         aria-describedby="name-error" 
                         [attr.aria-invalid]="profileForm.get('name')?.invalid && profileForm.get('name')?.touched">
                  <mat-error id="name-error" *ngIf="profileForm.get('name')?.hasError('required')">
                    Full name is required
                  </mat-error>
                  <mat-error *ngIf="profileForm.get('name')?.hasError('minlength')">
                    Name must be at least 2 characters
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline">
                  <mat-label>Email *</mat-label>
                  <input matInput formControlName="email" type="email" required
                         aria-describedby="email-error"
                         [attr.aria-invalid]="profileForm.get('email')?.invalid && profileForm.get('email')?.touched">
                  <mat-error id="email-error" *ngIf="profileForm.get('email')?.hasError('required')">
                    Email is required
                  </mat-error>
                  <mat-error *ngIf="profileForm.get('email')?.hasError('email')">
                    Please enter a valid email address
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline">
                  <mat-label>Phone *</mat-label>
                  <input matInput formControlName="phone" type="tel" required
                         aria-describedby="phone-error"
                         [attr.aria-invalid]="profileForm.get('phone')?.invalid && profileForm.get('phone')?.touched">
                  <mat-error id="phone-error" *ngIf="profileForm.get('phone')?.hasError('required')">
                    Phone number is required
                  </mat-error>
                  <mat-error *ngIf="profileForm.get('phone')?.hasError('pattern')">
                    Please enter a valid phone number
                  </mat-error>
                </mat-form-field>
                
                <mat-form-field appearance="outline">
                  <mat-label>Department</mat-label>
                  <input matInput formControlName="department" readonly
                         aria-label="Department (read-only)">
                </mat-form-field>
              </div>
            </form>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" 
                    (click)="onSubmit()" 
                    [disabled]="profileForm.invalid || isLoading"
                    aria-label="Update profile information">
              <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
              {{isLoading ? 'Updating...' : 'Update Profile'}}
            </button>
            <button mat-button (click)="onChangePassword()" 
                    [disabled]="isLoading"
                    aria-label="Change password">
              Change Password
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .profile-container { padding: 24px; position: relative; }
    .loading-overlay {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr 2fr;
      gap: 24px;
      margin-top: 24px;
    }
    .profile-avatar-large mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #667eea;
    }
    .profile-stats {
      display: flex;
      justify-content: space-around;
      margin-top: 16px;
    }
    .stat-item { text-align: center; }
    .stat-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #667eea;
    }
    .stat-label {
      font-size: 12px;
      color: #666;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .mat-mdc-card-actions button {
      margin-right: 8px;
    }
    .mat-mdc-card-actions button mat-spinner {
      margin-right: 8px;
    }
    @media (max-width: 768px) {
      .profile-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }
      .form-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  profileForm: FormGroup;
  isLoading = false;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private errorHandler: ErrorHandlerService
  ) {
    this.profileForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadingService.loading$.subscribe(loading => {
      this.isLoading = loading;
    });
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[1-9][\d\s\-\(\)]{7,15}$/)]],
      department: ['', []]
    });
  }

  private loadUserProfile(): void {
    this.loadingService.show();
    
    try {
      const currentUser = this.authService.getCurrentUser();
      
      const profileData: Record<string, UserProfile> = {
        'patient': {
          name: 'Mathew Boobies',
          email: 'patient@mediq.com',
          phone: '+1 (555) 123-4567',
          department: 'Patient Services',
          role: 'patient',
          stats: { experience: 'N/A', patients: 'N/A', rating: 'N/A' }
        },
        'doctor': {
          name: 'Dr. Mambegwa',
          email: 'doctor@mediq.com',
          phone: '+1 (555) 234-5678',
          department: 'Internal Medicine & Cardiology',
          role: 'doctor',
          stats: { experience: '06', patients: '2,847', rating: '4.87/5' }
        },
        'admin': {
          name: 'N. Shimambani, MSc',
          email: 'admin@mediq.com',
          phone: '+1 (555) 345-6789',
          department: 'Technology & Innovation',
          role: 'Chief Technology & Innovation Officer',
          stats: { experience: '8', departments: '04', rating: '4.93/5' }
        }
      };

      this.userProfile = profileData[currentUser?.role || 'patient'];
      this.populateForm();
      
    } catch (error) {
      this.errorHandler.handleError('Failed to load profile data');
    } finally {
      this.loadingService.hide();
    }
  }

  private populateForm(): void {
    if (this.userProfile) {
      this.profileForm.patchValue({
        name: this.userProfile.name,
        email: this.userProfile.email,
        phone: this.userProfile.phone,
        department: this.userProfile.department
      });
    }
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.loadingService.show();
      
      // Simulate API call
      setTimeout(() => {
        try {
          const formValue = this.profileForm.value;
          if (this.userProfile) {
            this.userProfile = { ...this.userProfile, ...formValue };
          }
          this.errorHandler.showSuccess('Profile updated successfully!');
        } catch (error) {
          this.errorHandler.handleError('Failed to update profile');
        } finally {
          this.loadingService.hide();
        }
      }, 1500);
    } else {
      this.markFormGroupTouched();
      this.errorHandler.showError('Please correct the errors in the form');
    }
  }

  onChangePassword(): void {
    this.errorHandler.showWarning('Password change functionality will be implemented soon');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.profileForm.controls).forEach(key => {
      const control = this.profileForm.get(key);
      control?.markAsTouched();
    });
  }
}