import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>Welcome back, {{currentUser?.name}}!</h1>
        <p class="user-info">Patient ID: {{currentUser?.id}} | Last login: {{lastLogin}}</p>
      </div>
      
      <div class="dashboard-grid">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>health_and_safety</mat-icon>
            <mat-card-title>AI Symptom Checker</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Get instant health insights with our AI-powered symptom analysis</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/symptom-checker">
              Start Check
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>calendar_today</mat-icon>
            <mat-card-title>Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>View and manage your upcoming appointments</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/appointments">
              View Appointments
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>mic</mat-icon>
            <mat-card-title>Voice Notes</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Record and manage your health voice notes</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/voice-notes">
              Record Note
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>folder_shared</mat-icon>
            <mat-card-title>Medical Records</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Access your complete medical history and reports</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/medical-records">
              View Records
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 24px;
    }
    .welcome-section {
      margin-bottom: 32px;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 8px;
    }
    .user-info {
      opacity: 0.9;
      margin: 8px 0 0 0;
    }
    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
      margin-top: 24px;
    }
    .dashboard-card {
      height: 200px;
    }
  `]
})
export class PatientDashboardComponent implements OnInit {
  currentUser: User | null = null;
  lastLogin = new Date().toLocaleDateString();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }