import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="analytics-container">
      <h1>Analytics & Reports</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">people</mat-icon>
            <mat-card-title>Total Patients</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">1,247</div>
            <div class="metric-change positive">+12% this month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">local_hospital</mat-icon>
            <mat-card-title>Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">3,456</div>
            <div class="metric-change positive">+8% this month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">trending_up</mat-icon>
            <mat-card-title>Revenue</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">$234,567</div>
            <div class="metric-change positive">+15% this month</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">hotel</mat-icon>
            <mat-card-title>Bed Occupancy</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">89%</div>
            <div class="metric-change negative">-3% this month</div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="reports-section">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Quick Reports</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="reports-grid">
              <button mat-raised-button color="primary">
                <mat-icon>assessment</mat-icon>
                Monthly Report
              </button>
              <button mat-raised-button color="primary">
                <mat-icon>bar_chart</mat-icon>
                Patient Statistics
              </button>
              <button mat-raised-button color="primary">
                <mat-icon>pie_chart</mat-icon>
                Department Performance
              </button>
              <button mat-raised-button color="primary">
                <mat-icon>timeline</mat-icon>
                Financial Report
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .analytics-container { padding: 24px; }
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }
    .metric-card { text-align: center; }
    .metric-value {
      font-size: 32px;
      font-weight: bold;
      color: #1976d2;
      margin: 16px 0 8px 0;
    }
    .metric-change {
      font-size: 14px;
      font-weight: 500;
    }
    .positive { color: #4caf50; }
    .negative { color: #f44336; }
    .reports-section { margin-top: 32px; }
    .reports-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-top: 16px;
    }
    .reports-grid button {
      height: 60px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}
}