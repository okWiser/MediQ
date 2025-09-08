import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-insurance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatProgressBarModule],
  template: `
    <div class="dashboard-container">
      <h1>Insurance Coverage</h1>
      
      <div class="dashboard-grid">
        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Primary Insurance</mat-card-title>
            <mat-chip class="status-active">Active</mat-chip>
          </mat-card-header>
          <mat-card-content>
            <div class="insurance-details">
              <div class="insurance-logo">
                <mat-icon>business</mat-icon>
              </div>
              <div class="insurance-info">
                <div class="provider-name">Blue Cross Blue Shield</div>
                <div class="plan-name">PPO Premium Plan</div>
                <div class="member-id">Member ID: BC123456789</div>
                <div class="group-number">Group: GRP-MEDIQ-001</div>
              </div>
            </div>
            
            <div class="coverage-summary">
              <div class="coverage-item">
                <div class="coverage-label">Annual Deductible</div>
                <div class="coverage-value">$3,000</div>
                <div class="coverage-progress">
                  <mat-progress-bar [value]="30" color="primary"></mat-progress-bar>
                  <span class="progress-text">$900 met</span>
                </div>
              </div>
              
              <div class="coverage-item">
                <div class="coverage-label">Out-of-Pocket Maximum</div>
                <div class="coverage-value">$8,000</div>
                <div class="coverage-progress">
                  <mat-progress-bar [value]="15" color="accent"></mat-progress-bar>
                  <span class="progress-text">$1,200 spent</span>
                </div>
              </div>
            </div>

            <div class="benefits-grid">
              <div class="benefit-item">
                <mat-icon>local_hospital</mat-icon>
                <div class="benefit-info">
                  <div class="benefit-name">Hospital Care</div>
                  <div class="benefit-coverage">80% after deductible</div>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon>person</mat-icon>
                <div class="benefit-info">
                  <div class="benefit-name">Primary Care</div>
                  <div class="benefit-coverage">$25 copay</div>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon>psychology</mat-icon>
                <div class="benefit-info">
                  <div class="benefit-name">Specialist</div>
                  <div class="benefit-coverage">$50 copay</div>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon>medication</mat-icon>
                <div class="benefit-info">
                  <div class="benefit-name">Prescriptions</div>
                  <div class="benefit-coverage">$10/$30/$60 copay</div>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon>emergency</mat-icon>
                <div class="benefit-info">
                  <div class="benefit-name">Emergency Room</div>
                  <div class="benefit-coverage">$150 copay</div>
                </div>
              </div>
              
              <div class="benefit-item">
                <mat-icon>biotech</mat-icon>
                <div class="benefit-info">
                  <div class="benefit-name">Lab Tests</div>
                  <div class="benefit-coverage">80% after deductible</div>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">View Full Benefits</button>
            <button mat-button>Download ID Card</button>
            <button mat-button>Find Providers</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Coverage Utilization</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="utilization-stats">
              <div class="stat-item">
                <div class="stat-value">$3,890</div>
                <div class="stat-label">Total Claims YTD</div>
                <div class="stat-detail">15 claims processed</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-value">85%</div>
                <div class="stat-label">Insurance Coverage</div>
                <div class="stat-detail">$3,306 covered</div>
              </div>
              
              <div class="stat-item">
                <div class="stat-value">$584</div>
                <div class="stat-label">Your Responsibility</div>
                <div class="stat-detail">Copays & deductible</div>
              </div>
            </div>

            <div class="recent-claims">
              <h3>Recent Claims</h3>
              <div class="claim-item" *ngFor="let claim of recentClaims">
                <div class="claim-info">
                  <div class="claim-service">{{claim.service}}</div>
                  <div class="claim-date">{{claim.date}}</div>
                </div>
                <div class="claim-amount">
                  <span class="billed">{{claim.billed | currency}}</span>
                  <mat-chip [class]="'status-' + claim.status">{{claim.statusText}}</mat-chip>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Preventive Care</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="preventive-care">
              <div class="care-item" *ngFor="let care of preventiveCare">
                <div class="care-header">
                  <mat-icon [style.color]="care.statusColor">{{care.icon}}</mat-icon>
                  <div class="care-info">
                    <div class="care-name">{{care.name}}</div>
                    <div class="care-frequency">{{care.frequency}}</div>
                  </div>
                  <mat-chip [class]="'status-' + care.status">{{care.statusText}}</mat-chip>
                </div>
                <div class="care-details">
                  <div class="last-visit">Last: {{care.lastVisit}}</div>
                  <div class="next-due">Next Due: {{care.nextDue}}</div>
                </div>
                <div class="care-coverage">
                  <mat-icon>check_circle</mat-icon>
                  <span>100% Covered - No copay</span>
                </div>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Schedule Preventive Care</button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Insurance Documents</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="documents-list">
              <div class="document-item" *ngFor="let doc of insuranceDocuments">
                <div class="document-info">
                  <mat-icon>{{doc.icon}}</mat-icon>
                  <div>
                    <div class="document-name">{{doc.name}}</div>
                    <div class="document-description">{{doc.description}}</div>
                    <div class="document-date">{{doc.date}}</div>
                  </div>
                </div>
                <div class="document-actions">
                  <button mat-icon-button><mat-icon>download</mat-icon></button>
                  <button mat-icon-button><mat-icon>print</mat-icon></button>
                  <button mat-icon-button><mat-icon>share</mat-icon></button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .insurance-details {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 24px;
      padding: 16px;
      background: linear-gradient(135deg, var(--premium-card) 0%, #1e293b 100%);
      border-radius: 8px;
    }
    
    .insurance-logo mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: var(--premium-accent);
    }
    
    .provider-name {
      font-size: 20px;
      font-weight: 700;
      color: var(--premium-text);
      margin-bottom: 4px;
    }
    
    .plan-name {
      font-size: 16px;
      color: var(--premium-accent);
      margin-bottom: 8px;
    }
    
    .member-id, .group-number {
      font-size: 12px;
      color: var(--premium-text-muted);
      margin-bottom: 2px;
    }
    
    .coverage-summary {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 24px;
    }
    
    .coverage-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
    }
    
    .coverage-label {
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .coverage-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--premium-accent);
      margin-bottom: 8px;
    }
    
    .coverage-progress {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .progress-text {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .benefits-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .benefit-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
    }
    
    .benefit-item mat-icon {
      color: var(--premium-accent);
    }
    
    .benefit-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .benefit-coverage {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .utilization-stats {
      display: flex;
      justify-content: space-around;
      margin-bottom: 24px;
    }
    
    .stat-item {
      text-align: center;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: var(--premium-accent);
      display: block;
    }
    
    .stat-label {
      font-weight: 600;
      margin: 4px 0;
    }
    
    .stat-detail {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .recent-claims {
      margin-top: 24px;
    }
    
    .recent-claims h3 {
      margin-bottom: 16px;
    }
    
    .claim-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
      margin-bottom: 8px;
    }
    
    .claim-service {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .claim-date {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .claim-amount {
      text-align: right;
    }
    
    .billed {
      font-weight: 600;
      color: var(--premium-accent);
      display: block;
      margin-bottom: 4px;
    }
    
    .preventive-care {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .care-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
    }
    
    .care-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 8px;
    }
    
    .care-info {
      flex: 1;
    }
    
    .care-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .care-frequency {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .care-details {
      display: flex;
      gap: 24px;
      margin-bottom: 8px;
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .care-coverage {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #10b981;
    }
    
    .care-coverage mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .documents-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    
    .document-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
    }
    
    .document-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .document-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .document-description {
      font-size: 12px;
      color: var(--premium-text-muted);
      margin-bottom: 2px;
    }
    
    .document-date {
      font-size: 11px;
      color: var(--premium-text-muted);
    }
    
    .document-actions {
      display: flex;
      gap: 4px;
    }
  `]
})
export class InsuranceComponent implements OnInit {
  recentClaims = [
    { service: 'Annual Physical', date: '2024-01-10', billed: 450, status: 'approved', statusText: 'Approved' },
    { service: 'Blood Work', date: '2024-01-08', billed: 280, status: 'processing', statusText: 'Processing' },
    { service: 'Cardiology Consult', date: '2023-12-15', billed: 650, status: 'approved', statusText: 'Approved' }
  ];

  preventiveCare = [
    {
      name: 'Annual Physical Exam',
      frequency: 'Once per year',
      lastVisit: '2024-01-10',
      nextDue: '2025-01-10',
      status: 'current',
      statusText: 'Up to Date',
      statusColor: '#10b981',
      icon: 'health_and_safety'
    },
    {
      name: 'Mammogram',
      frequency: 'Every 2 years',
      lastVisit: '2023-03-15',
      nextDue: '2025-03-15',
      status: 'current',
      statusText: 'Up to Date',
      statusColor: '#10b981',
      icon: 'medical_services'
    },
    {
      name: 'Colonoscopy',
      frequency: 'Every 10 years',
      lastVisit: '2019-08-20',
      nextDue: '2029-08-20',
      status: 'current',
      statusText: 'Up to Date',
      statusColor: '#10b981',
      icon: 'biotech'
    },
    {
      name: 'Eye Exam',
      frequency: 'Every 2 years',
      lastVisit: '2022-06-10',
      nextDue: '2024-06-10',
      status: 'due',
      statusText: 'Due Soon',
      statusColor: '#f59e0b',
      icon: 'visibility'
    }
  ];

  insuranceDocuments = [
    {
      name: 'Insurance ID Card',
      description: 'Digital copy of your insurance card',
      date: 'Updated: 2024-01-01',
      icon: 'badge'
    },
    {
      name: 'Benefits Summary',
      description: '2024 plan benefits and coverage details',
      date: 'Generated: 2024-01-01',
      icon: 'description'
    },
    {
      name: 'Explanation of Benefits',
      description: 'EOB for recent claims and payments',
      date: 'Latest: 2024-01-15',
      icon: 'receipt_long'
    },
    {
      name: 'Prior Authorization Forms',
      description: 'Forms for specialist referrals and procedures',
      date: 'Updated: 2024-01-01',
      icon: 'assignment'
    }
  ];

  ngOnInit() {}
}