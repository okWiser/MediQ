import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-compliance',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatChipsModule, MatTabsModule, MatProgressBarModule],
  template: `
    <div class="dashboard-container">
      <h1>Compliance Management</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">98.5%</div>
            <div class="metric-label">HIPAA Compliance</div>
            <div class="metric-change positive">+1.2%</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">15</div>
            <div class="metric-label">Active Audits</div>
            <div class="metric-change stable">No change</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">3</div>
            <div class="metric-label">Violations</div>
            <div class="metric-change negative">+1</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">45</div>
            <div class="metric-label">Days to Renewal</div>
            <div class="metric-change warning">Expiring Soon</div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group class="compliance-tabs">
        <mat-tab label="HIPAA Compliance">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>HIPAA Compliance Status</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="compliance-items">
                  <div class="compliance-item" *ngFor="let item of hipaaCompliance">
                    <div class="compliance-header">
                      <div class="compliance-info">
                        <mat-icon [style.color]="item.statusColor">{{item.icon}}</mat-icon>
                        <div>
                          <div class="compliance-name">{{item.requirement}}</div>
                          <div class="compliance-description">{{item.description}}</div>
                        </div>
                      </div>
                      <mat-chip [class]="'status-' + item.status">{{item.statusText}}</mat-chip>
                    </div>
                    <div class="compliance-progress">
                      <mat-progress-bar [value]="item.completionRate" [color]="item.progressColor"></mat-progress-bar>
                      <span class="progress-text">{{item.completionRate}}% Complete</span>
                    </div>
                    <div class="compliance-actions">
                      <button mat-button>View Details</button>
                      <button mat-button *ngIf="item.status !== 'compliant'">Take Action</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Regulatory Requirements">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Regulatory Compliance</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <table mat-table [dataSource]="regulatoryRequirements">
                  <ng-container matColumnDef="regulation">
                    <th mat-header-cell *matHeaderCellDef>Regulation</th>
                    <td mat-cell *matCellDef="let requirement">{{requirement.regulation}}</td>
                  </ng-container>
                  
                  <ng-container matColumnDef="category">
                    <th mat-header-cell *matHeaderCellDef>Category</th>
                    <td mat-cell *matCellDef="let requirement">{{requirement.category}}</td>
                  </ng-container>
                  
                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let requirement">
                      <mat-chip [class]="'status-' + requirement.status">{{requirement.statusText}}</mat-chip>
                    </td>
                  </ng-container>
                  
                  <ng-container matColumnDef="lastReview">
                    <th mat-header-cell *matHeaderCellDef>Last Review</th>
                    <td mat-cell *matCellDef="let requirement">{{requirement.lastReview}}</td>
                  </ng-container>
                  
                  <ng-container matColumnDef="nextReview">
                    <th mat-header-cell *matHeaderCellDef>Next Review</th>
                    <td mat-cell *matCellDef="let requirement">{{requirement.nextReview}}</td>
                  </ng-container>
                  
                  <tr mat-header-row *matHeaderRowDef="regulatoryColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: regulatoryColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Staff Training">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Compliance Training Status</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="training-list">
                  <div class="training-item" *ngFor="let training of staffTraining">
                    <div class="training-header">
                      <div class="training-info">
                        <div class="training-name">{{training.course}}</div>
                        <div class="training-department">{{training.department}}</div>
                      </div>
                      <div class="training-stats">
                        <span class="completion-rate">{{training.completionRate}}% Complete</span>
                        <mat-chip [class]="'status-' + training.status">{{training.statusText}}</mat-chip>
                      </div>
                    </div>
                    <div class="training-progress">
                      <mat-progress-bar [value]="training.completionRate" [color]="training.progressColor"></mat-progress-bar>
                    </div>
                    <div class="training-details">
                      <span>{{training.completedStaff}}/{{training.totalStaff}} staff completed</span>
                      <span>Due: {{training.dueDate}}</span>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Risk Assessment">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Compliance Risk Assessment</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="risk-items">
                  <div class="risk-item" *ngFor="let risk of riskAssessment">
                    <div class="risk-header">
                      <mat-icon [style.color]="risk.severityColor">{{risk.icon}}</mat-icon>
                      <div class="risk-info">
                        <div class="risk-title">{{risk.title}}</div>
                        <div class="risk-description">{{risk.description}}</div>
                      </div>
                      <mat-chip [class]="'severity-' + risk.severity">{{risk.severityText}}</mat-chip>
                    </div>
                    <div class="risk-details">
                      <div class="risk-impact">Impact: {{risk.impact}}</div>
                      <div class="risk-probability">Probability: {{risk.probability}}</div>
                      <div class="risk-mitigation">Mitigation: {{risk.mitigation}}</div>
                    </div>
                    <div class="risk-actions">
                      <button mat-raised-button [color]="risk.severity === 'high' ? 'warn' : 'primary'">Address Risk</button>
                      <button mat-button>View Plan</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .compliance-tabs { margin-top: 24px; }
    .metric-change { font-size: 12px; font-weight: 600; }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    .stable { color: #6b7280; }
    .warning { color: #f59e0b; }
    
    .compliance-items, .training-list, .risk-items { display: flex; flex-direction: column; gap: 16px; }
    .compliance-item, .training-item, .risk-item { padding: 16px; border: 1px solid var(--premium-border); border-radius: 8px; }
    .compliance-header, .training-header, .risk-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .compliance-info, .training-info, .risk-info { display: flex; align-items: center; gap: 12px; flex: 1; }
    .compliance-name, .training-name, .risk-title { font-weight: 600; }
    .compliance-description, .training-department, .risk-description { font-size: 12px; color: var(--premium-text-muted); }
    .compliance-progress, .training-progress { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .progress-text { font-size: 12px; color: var(--premium-text-muted); }
    .compliance-actions, .risk-actions { display: flex; gap: 12px; }
    
    .training-stats { display: flex; align-items: center; gap: 12px; }
    .completion-rate { font-size: 14px; font-weight: 600; color: var(--premium-accent); }
    .training-details { display: flex; justify-content: space-between; font-size: 12px; color: var(--premium-text-muted); }
    
    .risk-details { margin-bottom: 12px; }
    .risk-impact, .risk-probability, .risk-mitigation { font-size: 12px; margin-bottom: 4px; }
    .severity-high { background-color: #fecaca; color: #991b1b; }
    .severity-medium { background-color: #fed7aa; color: #9a3412; }
    .severity-low { background-color: #dcfce7; color: #166534; }
  `]
})
export class ComplianceComponent implements OnInit {
  regulatoryColumns = ['regulation', 'category', 'status', 'lastReview', 'nextReview'];

  hipaaCompliance = [
    {
      requirement: 'Administrative Safeguards',
      description: 'Policies and procedures for PHI access and management',
      status: 'compliant',
      statusText: 'Compliant',
      statusColor: '#10b981',
      completionRate: 98,
      progressColor: 'primary',
      icon: 'admin_panel_settings'
    },
    {
      requirement: 'Physical Safeguards',
      description: 'Physical access controls and workstation security',
      status: 'compliant',
      statusText: 'Compliant',
      statusColor: '#10b981',
      completionRate: 95,
      progressColor: 'primary',
      icon: 'security'
    },
    {
      requirement: 'Technical Safeguards',
      description: 'Access controls, audit logs, and data integrity',
      status: 'partial',
      statusText: 'Partial Compliance',
      statusColor: '#f59e0b',
      completionRate: 87,
      progressColor: 'accent',
      icon: 'computer'
    },
    {
      requirement: 'Breach Notification',
      description: 'Procedures for reporting and managing data breaches',
      status: 'non-compliant',
      statusText: 'Non-Compliant',
      statusColor: '#ef4444',
      completionRate: 65,
      progressColor: 'warn',
      icon: 'report_problem'
    }
  ];

  regulatoryRequirements = [
    { regulation: 'HIPAA Privacy Rule', category: 'Data Protection', status: 'compliant', statusText: 'Compliant', lastReview: '2024-01-15', nextReview: '2024-07-15' },
    { regulation: 'HIPAA Security Rule', category: 'Data Security', status: 'partial', statusText: 'Partial', lastReview: '2024-01-10', nextReview: '2024-04-10' },
    { regulation: 'FDA 21 CFR Part 11', category: 'Electronic Records', status: 'compliant', statusText: 'Compliant', lastReview: '2023-12-20', nextReview: '2024-06-20' },
    { regulation: 'SOX Compliance', category: 'Financial Reporting', status: 'compliant', statusText: 'Compliant', lastReview: '2024-01-05', nextReview: '2024-07-05' },
    { regulation: 'Joint Commission', category: 'Healthcare Quality', status: 'non-compliant', statusText: 'Non-Compliant', lastReview: '2023-11-30', nextReview: '2024-02-28' }
  ];

  staffTraining = [
    {
      course: 'HIPAA Privacy & Security Training',
      department: 'All Departments',
      completionRate: 92,
      completedStaff: 184,
      totalStaff: 200,
      status: 'on-track',
      statusText: 'On Track',
      progressColor: 'primary',
      dueDate: '2024-03-31'
    },
    {
      course: 'Cybersecurity Awareness',
      department: 'IT & Administration',
      completionRate: 78,
      completedStaff: 39,
      totalStaff: 50,
      status: 'behind',
      statusText: 'Behind Schedule',
      progressColor: 'warn',
      dueDate: '2024-02-28'
    },
    {
      course: 'Emergency Response Procedures',
      department: 'Clinical Staff',
      completionRate: 100,
      completedStaff: 120,
      totalStaff: 120,
      status: 'complete',
      statusText: 'Complete',
      progressColor: 'primary',
      dueDate: '2024-01-31'
    }
  ];

  riskAssessment = [
    {
      title: 'Unauthorized PHI Access',
      description: 'Risk of unauthorized access to patient health information',
      severity: 'high',
      severityText: 'High Risk',
      severityColor: '#ef4444',
      impact: 'Severe financial penalties and reputation damage',
      probability: 'Medium (30%)',
      mitigation: 'Enhanced access controls and monitoring',
      icon: 'warning'
    },
    {
      title: 'Data Breach Incident',
      description: 'Potential for data breach due to system vulnerabilities',
      severity: 'high',
      severityText: 'High Risk',
      severityColor: '#ef4444',
      impact: 'Legal liability and patient trust loss',
      probability: 'Low (15%)',
      mitigation: 'Regular security assessments and patches',
      icon: 'security'
    },
    {
      title: 'Staff Training Gaps',
      description: 'Incomplete compliance training among staff members',
      severity: 'medium',
      severityText: 'Medium Risk',
      severityColor: '#f59e0b',
      impact: 'Increased compliance violations',
      probability: 'High (60%)',
      mitigation: 'Mandatory training programs and tracking',
      icon: 'school'
    },
    {
      title: 'Vendor Compliance Issues',
      description: 'Third-party vendors may not meet compliance standards',
      severity: 'low',
      severityText: 'Low Risk',
      severityColor: '#10b981',
      impact: 'Indirect compliance exposure',
      probability: 'Low (20%)',
      mitigation: 'Regular vendor assessments and contracts',
      icon: 'business'
    }
  ];

  ngOnInit() {}
}