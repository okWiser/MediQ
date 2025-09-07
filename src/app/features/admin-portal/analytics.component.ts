import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatSnackBarModule],
  template: `
    <div class="analytics-container">
      <h1>Analytics & Reports</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card" (click)="showDetails('patients')">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">people</mat-icon>
            <mat-card-title>Active Patients</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">{{metrics.totalPatients | number}}</div>
            <div class="metric-change positive">+12% this month</div>
            <div class="metric-detail">247 new registrations</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card" (click)="showDetails('appointments')">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">event</mat-icon>
            <mat-card-title>Monthly Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">{{metrics.totalAppointments | number}}</div>
            <div class="metric-change positive">+8% vs last month</div>
            <div class="metric-detail">98.2% attendance rate</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card" (click)="showDetails('revenue')">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">attach_money</mat-icon>
            <mat-card-title>Monthly Revenue</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">${{metrics.revenue | number}}</div>
            <div class="metric-change positive">+15% vs last month</div>
            <div class="metric-detail">$2.1M YTD target: 89%</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card" (click)="showDetails('satisfaction')">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">star</mat-icon>
            <mat-card-title>Patient Satisfaction</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">{{metrics.patientSatisfaction}}/5.0</div>
            <div class="metric-change positive">+0.2 this month</div>
            <div class="metric-detail">1,234 responses</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card" (click)="showDetails('efficiency')">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">speed</mat-icon>
            <mat-card-title>Avg Wait Time</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">{{metrics.averageWaitTime}} min</div>
            <div class="metric-change positive">-3 min improvement</div>
            <div class="metric-detail">Target: <15 min</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card" (click)="showDetails('occupancy')">
          <mat-card-header>
            <mat-icon mat-card-avatar color="primary">hotel</mat-icon>
            <mat-card-title>Bed Occupancy</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="metric-value">{{metrics.bedOccupancy}}%</div>
            <div class="metric-change negative">-2% this month</div>
            <div class="metric-detail">156/175 beds occupied</div>
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
              <button mat-raised-button color="primary" (click)="generateReport('monthly')">
                <mat-icon>assessment</mat-icon>
                Monthly Performance Report
                <span class="report-status">Ready</span>
              </button>
              <button mat-raised-button color="primary" (click)="generateReport('patient-stats')">
                <mat-icon>bar_chart</mat-icon>
                Patient Demographics & Trends
                <span class="report-status">Ready</span>
              </button>
              <button mat-raised-button color="primary" (click)="generateReport('department')">
                <mat-icon>pie_chart</mat-icon>
                Department Efficiency Analysis
                <span class="report-status">Ready</span>
              </button>
              <button mat-raised-button color="primary" (click)="generateReport('financial')">
                <mat-icon>timeline</mat-icon>
                Financial Performance Dashboard
                <span class="report-status">Ready</span>
              </button>
              <button mat-raised-button color="accent" (click)="generateReport('quality')">
                <mat-icon>verified</mat-icon>
                Quality Metrics & Compliance
                <span class="report-status">New</span>
              </button>
              <button mat-raised-button color="accent" (click)="generateReport('predictive')">
                <mat-icon>psychology</mat-icon>
                AI Predictive Analytics
                <span class="report-status">Beta</span>
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
    .metric-detail {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
    .metric-card {
      cursor: pointer;
      transition: transform 0.2s;
    }
    .metric-card:hover {
      transform: translateY(-2px);
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
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      position: relative;
    }
    .report-status {
      position: absolute;
      top: 8px;
      right: 8px;
      font-size: 10px;
      background: #4caf50;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
    }
  `]
})
export class AnalyticsComponent implements OnInit {
  metrics: any = {};

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadMetrics();
  }

  loadMetrics() {
    this.metrics = {
      totalPatients: 1247,
      totalAppointments: 3456,
      revenue: 234567,
      patientSatisfaction: 4.8,
      averageWaitTime: 12,
      bedOccupancy: 89
    };
  }

  showDetails(metric: string) {
    this.snackBar.open(`Detailed ${metric} analytics would open here`, 'Close', { duration: 3000 });
  }

  generateReport(type: string) {
    const reportNames = {
      'monthly': 'Monthly Performance Report',
      'patient-stats': 'Patient Demographics Report',
      'department': 'Department Efficiency Report',
      'financial': 'Financial Dashboard',
      'quality': 'Quality Metrics Report',
      'predictive': 'AI Predictive Analytics Report'
    };
    
    this.snackBar.open(`Generating ${reportNames[type as keyof typeof reportNames]}...`, 'Close', { duration: 3000 });
  }