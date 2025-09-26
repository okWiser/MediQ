import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <div class="profile-container">
      <h1>My Profile</h1>
      
      <div class="profile-grid">
        <mat-card class="profile-info-card">
          <mat-card-header>
            <div class="profile-avatar-large">
              <mat-icon>account_circle</mat-icon>
            </div>
            <mat-card-title>{{userProfile.name}}</mat-card-title>
            <mat-card-subtitle>{{userProfile.role | titlecase}} • {{userProfile.department}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="profile-stats">
              <div class="stat-item">
                <span class="stat-value">{{userProfile.stats.experience}}</span>
                <span class="stat-label">Years Experience</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{userProfile.stats.patients}}</span>
                <span class="stat-label">Patients Served</span>
              </div>
              <div class="stat-item">
                <span class="stat-value">{{userProfile.stats.rating}}</span>
                <span class="stat-label">Rating</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="profile-details-card">
          <mat-card-header>
            <mat-card-title>Personal Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="form-grid">
              <mat-form-field appearance="outline">
                <mat-label>Full Name</mat-label>
                <input matInput [(ngModel)]="userProfile.name">
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput [(ngModel)]="userProfile.email">
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput [(ngModel)]="userProfile.phone">
              </mat-form-field>
              
              <mat-form-field appearance="outline">
                <mat-label>Department</mat-label>
                <input matInput [(ngModel)]="userProfile.department">
              </mat-form-field>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Update Profile</button>
            <button mat-button>Change Password</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .profile-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;
      margin-top: 16px;
    }
    .profile-avatar-large mat-icon {
      font-size: 60px;
      width: 60px;
      height: 60px;
      color: #667eea;
    }
    .profile-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .stat-item { text-align: center; }
    .stat-value {
      display: block;
      font-size: 20px;
      font-weight: bold;
      color: #667eea;
    }
    .stat-label {
      font-size: 11px;
      color: #666;
    }
    .form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    
    /* Tablet: 768px+ */
    @media (min-width: 768px) {
      .profile-container { padding: 20px; }
      .profile-grid {
        grid-template-columns: 1fr 1.5fr;
        gap: 20px;
        margin-top: 20px;
      }
      .profile-avatar-large mat-icon {
        font-size: 70px;
        width: 70px;
        height: 70px;
      }
      .form-grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .stat-value { font-size: 22px; }
      .stat-label { font-size: 12px; }
    }
    
    /* Desktop: 1024px+ */
    @media (min-width: 1024px) {
      .profile-container { padding: 24px; }
      .profile-grid {
        grid-template-columns: 1fr 2fr;
        gap: 24px;
        margin-top: 24px;
      }
      .profile-avatar-large mat-icon {
        font-size: 80px;
        width: 80px;
        height: 80px;
      }
      .profile-stats {
        display: flex;
        justify-content: space-around;
      }
      .stat-value { font-size: 24px; }
      .stat-label { font-size: 12px; }
    }
    
    /* Large Desktop: 1440px+ */
    @media (min-width: 1440px) {
      .profile-container { padding: 32px; }
      .profile-grid { gap: 32px; }
      .form-grid { gap: 20px; }
    }
  `]
})
export class ProfileComponent implements OnInit {
  userProfile: any = {};

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    
    const profileData = {
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
        stats: { experience: '15', patients: '2,847', rating: '4.95/5' }
      },
      'admin': {
        name: 'N. Shimambani, MSc',
        email: 'n.shimambani@mediq.com',
        phone: '+1 (555) 345-6789',
        department: 'Technology & Innovation',
        role: 'Chief Technology & Innovation Officer',
        stats: { experience: '8', patients: 'N/A', rating: 'N/A' }
      }
    };

    this.userProfile = profileData[currentUser?.role as keyof typeof profileData] || profileData['patient'];
  }
}