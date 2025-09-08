import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-lab-results',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressBarModule],
  template: `
    <div class="dashboard-container">
      <h1>Lab Results</h1>
      
      <div class="dashboard-grid">
        <mat-card class="overview-card" *ngFor="let result of labResults">
          <mat-card-header>
            <mat-card-title>{{result.testName}}</mat-card-title>
            <mat-card-subtitle>{{result.date}}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <div class="result-value">
              <span class="value">{{result.value}}</span>
              <span class="unit">{{result.unit}}</span>
              <mat-chip [class]="'status-' + result.status">{{result.status}}</mat-chip>
            </div>
            <div class="reference-range">
              <span>Reference Range: {{result.referenceRange}}</span>
            </div>
            <mat-progress-bar 
              [value]="result.percentile" 
              [color]="result.status === 'normal' ? 'primary' : 'warn'">
            </mat-progress-bar>
          </mat-card-content>
          <mat-card-actions>
            <button mat-button>View Trend</button>
            <button mat-button>Download PDF</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .result-value {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }
    .value {
      font-size: 24px;
      font-weight: 700;
      color: var(--premium-accent);
    }
    .unit {
      color: var(--premium-text-muted);
    }
    .reference-range {
      font-size: 12px;
      color: var(--premium-text-muted);
      margin-bottom: 8px;
    }
  `]
})
export class LabResultsComponent implements OnInit {
  labResults = [
    {
      testName: 'Complete Blood Count',
      date: 'January 15, 2024',
      value: '4.8',
      unit: 'M/μL',
      referenceRange: '4.5-5.5 M/μL',
      status: 'normal',
      percentile: 65
    },
    {
      testName: 'Cholesterol Total',
      date: 'January 15, 2024',
      value: '220',
      unit: 'mg/dL',
      referenceRange: '<200 mg/dL',
      status: 'high',
      percentile: 85
    },
    {
      testName: 'Blood Glucose',
      date: 'January 15, 2024',
      value: '95',
      unit: 'mg/dL',
      referenceRange: '70-100 mg/dL',
      status: 'normal',
      percentile: 70
    }
  ];

  ngOnInit() {}
}