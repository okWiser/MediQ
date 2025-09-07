import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="welcome-section">
        <h1>Welcome, {{currentUser?.name}}!</h1>
        <p class="user-info">{{currentUser?.specialization}} | License: {{currentUser?.medicalLicense}}</p>
        <p class="stats">Today's Appointments: 8 | Pending Reviews: 3</p>
      </div>
      
      <div class="dashboard-grid">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>people</mat-icon>
            <mat-card-title>Patient Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>View and manage your patient roster and medical records</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/patients">
              Manage Patients
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>schedule</mat-icon>
            <mat-card-title>Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>View today's schedule and upcoming appointments</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/doctor-schedule">
              View Schedule
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>assignment</mat-icon>
            <mat-card-title>Prescriptions</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Create and manage patient prescriptions</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/prescriptions">
              Manage Prescriptions
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>analytics</mat-icon>
            <mat-card-title>AI Insights</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>AI-powered patient insights and diagnostic assistance</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/ai-insights">
              View Insights
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
      background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
      color: white;
      border-radius: 8px;
    }
    .user-info, .stats {
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
export class DoctorDashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }