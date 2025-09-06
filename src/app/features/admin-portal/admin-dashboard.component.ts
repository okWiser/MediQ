import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <h1>Admin Dashboard</h1>
      
      <div class="dashboard-grid">
        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>supervisor_account</mat-icon>
            <mat-card-title>User Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Manage doctors, patients, and staff accounts</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/user-management">
              Manage Users
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>business</mat-icon>
            <mat-card-title>Hospital Management</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Manage departments, rooms, and hospital resources</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/hospital-management">
              Manage Hospital
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>bar_chart</mat-icon>
            <mat-card-title>Analytics & Reports</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>View system analytics and generate reports</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/analytics">
              View Analytics
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="dashboard-card">
          <mat-card-header>
            <mat-icon mat-card-avatar>settings</mat-icon>
            <mat-card-title>System Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Configure system settings and preferences</p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" routerLink="/system-settings">
              System Settings
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
export class AdminDashboardComponent {}