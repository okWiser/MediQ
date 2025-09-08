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
  selector: 'app-billing',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatChipsModule, MatTabsModule, MatProgressBarModule],
  template: `
    <div class="dashboard-container">
      <h1>Billing & Finance Management</h1>
      
      <div class="metrics-grid">
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">$2.4M</div>
            <div class="metric-label">Monthly Revenue</div>
            <div class="metric-change positive">+12.5%</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">$180K</div>
            <div class="metric-label">Outstanding</div>
            <div class="metric-change negative">+5.2%</div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">94.2%</div>
            <div class="metric-label">Collection Rate</div>
            <div class="metric-change positive">+2.1%</div>
          </mat-card-content>
        </mat-card>

        <mat-card class="metric-card">
          <mat-card-content>
            <div class="metric-value">87%</div>
            <div class="metric-label">Insurance Coverage</div>
            <div class="metric-change positive">+3.1%</div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group class="billing-tabs">
        <mat-tab label="Recent Transactions">
          <mat-card class="overview-card">
            <mat-card-header>
              <mat-card-title>Payment Transactions</mat-card-title>
              <button mat-raised-button color="primary">Export Report</button>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="transactions">
                <ng-container matColumnDef="patient">
                  <th mat-header-cell *matHeaderCellDef>Patient</th>
                  <td mat-cell *matCellDef="let transaction">{{transaction.patient}}</td>
                </ng-container>
                
                <ng-container matColumnDef="amount">
                  <th mat-header-cell *matHeaderCellDef>Amount</th>
                  <td mat-cell *matCellDef="let transaction">{{transaction.amount | currency}}</td>
                </ng-container>
                
                <ng-container matColumnDef="insurance">
                  <th mat-header-cell *matHeaderCellDef>Insurance</th>
                  <td mat-cell *matCellDef="let transaction">{{transaction.insurance}}</td>
                </ng-container>
                
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let transaction">
                    <mat-chip [class]="'status-' + transaction.status">{{transaction.status}}</mat-chip>
                  </td>
                </ng-container>
                
                <ng-container matColumnDef="date">
                  <th mat-header-cell *matHeaderCellDef>Date</th>
                  <td mat-cell *matCellDef="let transaction">{{transaction.date}}</td>
                </ng-container>
                
                <ng-container matColumnDef="actions">
                  <th mat-header-cell *matHeaderCellDef>Actions</th>
                  <td mat-cell *matCellDef="let transaction">
                    <button mat-icon-button><mat-icon>visibility</mat-icon></button>
                    <button mat-icon-button><mat-icon>print</mat-icon></button>
                  </td>
                </ng-container>
                
                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>

        <mat-tab label="Insurance Claims">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Active Claims</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="claims-list">
                  <div class="claim-item" *ngFor="let claim of insuranceClaims">
                    <div class="claim-header">
                      <div class="claim-info">
                        <div class="claim-number">Claim #{{claim.claimNumber}}</div>
                        <div class="patient-name">{{claim.patient}}</div>
                      </div>
                      <mat-chip [class]="'status-' + claim.status">{{claim.status}}</mat-chip>
                    </div>
                    <div class="claim-details">
                      <div class="detail-row">
                        <span>Insurance Provider:</span>
                        <span>{{claim.provider}}</span>
                      </div>
                      <div class="detail-row">
                        <span>Claim Amount:</span>
                        <span>{{claim.amount | currency}}</span>
                      </div>
                      <div class="detail-row">
                        <span>Expected Reimbursement:</span>
                        <span>{{claim.expectedReimbursement | currency}}</span>
                      </div>
                      <div class="progress-section">
                        <span>Processing Progress:</span>
                        <mat-progress-bar [value]="claim.progress" color="primary"></mat-progress-bar>
                        <span>{{claim.progress}}%</span>
                      </div>
                    </div>
                    <div class="claim-actions">
                      <button mat-button>Follow Up</button>
                      <button mat-button>View Details</button>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Insurance Providers</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="provider-list">
                  <div class="provider-item" *ngFor="let provider of insuranceProviders">
                    <div class="provider-info">
                      <mat-icon>business</mat-icon>
                      <div>
                        <div class="provider-name">{{provider.name}}</div>
                        <div class="provider-type">{{provider.type}}</div>
                      </div>
                    </div>
                    <div class="provider-stats">
                      <div class="stat">
                        <span class="stat-value">{{provider.activePatients}}</span>
                        <span class="stat-label">Active Patients</span>
                      </div>
                      <div class="stat">
                        <span class="stat-value">{{provider.avgReimbursement}}%</span>
                        <span class="stat-label">Avg Reimbursement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

        <mat-tab label="Payment Methods">
          <div class="dashboard-grid">
            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Payment Processing</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="payment-methods">
                  <div class="payment-method" *ngFor="let method of paymentMethods">
                    <mat-icon>{{method.icon}}</mat-icon>
                    <div class="method-info">
                      <div class="method-name">{{method.name}}</div>
                      <div class="method-stats">
                        <span>{{method.transactions}} transactions</span>
                        <span>{{method.volume | currency}} volume</span>
                      </div>
                    </div>
                    <div class="method-status">
                      <mat-chip [class]="'status-' + method.status">{{method.status}}</mat-chip>
                    </div>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>

            <mat-card class="overview-card">
              <mat-card-header>
                <mat-card-title>Outstanding Balances</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="balance-categories">
                  <div class="balance-item" *ngFor="let balance of outstandingBalances">
                    <div class="balance-header">
                      <span class="category">{{balance.category}}</span>
                      <span class="amount">{{balance.amount | currency}}</span>
                    </div>
                    <mat-progress-bar [value]="balance.percentage" [color]="balance.color"></mat-progress-bar>
                    <div class="balance-details">
                      <span>{{balance.count}} accounts</span>
                      <span>Avg: {{balance.average | currency}}</span>
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
    .billing-tabs {
      margin-top: 24px;
    }
    .metric-change {
      font-size: 12px;
      font-weight: 600;
    }
    .positive { color: #10b981; }
    .negative { color: #ef4444; }
    
    .claims-list, .provider-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .claim-item, .provider-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
      background: var(--premium-card);
    }
    
    .claim-header, .provider-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    
    .claim-details {
      margin-bottom: 16px;
    }
    
    .detail-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    .progress-section {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 12px;
    }
    
    .claim-actions {
      display: flex;
      gap: 12px;
    }
    
    .provider-stats {
      display: flex;
      gap: 24px;
    }
    
    .stat {
      text-align: center;
    }
    
    .stat-value {
      display: block;
      font-weight: 600;
      color: var(--premium-accent);
    }
    
    .stat-label {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .payment-method {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
    }
    
    .method-info {
      flex: 1;
    }
    
    .method-name {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .method-stats {
      display: flex;
      gap: 16px;
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    
    .balance-categories {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    .balance-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
    }
    
    .balance-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
    }
    
    .balance-details {
      display: flex;
      justify-content: space-between;
      margin-top: 8px;
      font-size: 12px;
      color: var(--premium-text-muted);
    }
  `]
})
export class BillingComponent implements OnInit {
  displayedColumns = ['patient', 'amount', 'insurance', 'status', 'date', 'actions'];
  
  transactions = [
    { patient: 'John Smith', amount: 250, insurance: 'Blue Cross', status: 'paid', date: '2024-01-15' },
    { patient: 'Sarah Johnson', amount: 180, insurance: 'Aetna', status: 'pending', date: '2024-01-14' },
    { patient: 'Mike Davis', amount: 320, insurance: 'Cigna', status: 'processing', date: '2024-01-10' },
    { patient: 'Lisa Brown', amount: 450, insurance: 'UnitedHealth', status: 'denied', date: '2024-01-08' }
  ];

  insuranceClaims = [
    {
      claimNumber: 'CLM-2024-001',
      patient: 'John Smith',
      provider: 'Blue Cross Blue Shield',
      amount: 1250,
      expectedReimbursement: 1000,
      status: 'processing',
      progress: 65
    },
    {
      claimNumber: 'CLM-2024-002',
      patient: 'Sarah Johnson',
      provider: 'Aetna',
      amount: 890,
      expectedReimbursement: 712,
      status: 'approved',
      progress: 100
    },
    {
      claimNumber: 'CLM-2024-003',
      patient: 'Mike Davis',
      provider: 'Cigna',
      amount: 2100,
      expectedReimbursement: 1680,
      status: 'under-review',
      progress: 30
    }
  ];

  insuranceProviders = [
    {
      name: 'Blue Cross Blue Shield',
      type: 'Major Medical',
      activePatients: 245,
      avgReimbursement: 85
    },
    {
      name: 'Aetna',
      type: 'HMO/PPO',
      activePatients: 189,
      avgReimbursement: 78
    },
    {
      name: 'UnitedHealth',
      type: 'Medicare Advantage',
      activePatients: 156,
      avgReimbursement: 92
    },
    {
      name: 'Cigna',
      type: 'Corporate Health',
      activePatients: 134,
      avgReimbursement: 81
    }
  ];

  paymentMethods = [
    {
      name: 'Credit/Debit Cards',
      icon: 'credit_card',
      transactions: 1245,
      volume: 450000,
      status: 'active'
    },
    {
      name: 'Bank Transfers',
      icon: 'account_balance',
      transactions: 567,
      volume: 890000,
      status: 'active'
    },
    {
      name: 'Cash Payments',
      icon: 'payments',
      transactions: 234,
      volume: 45000,
      status: 'active'
    },
    {
      name: 'Insurance Direct Pay',
      icon: 'business',
      transactions: 789,
      volume: 1200000,
      status: 'active'
    }
  ];

  outstandingBalances = [
    {
      category: '0-30 Days',
      amount: 45000,
      percentage: 75,
      color: 'primary',
      count: 89,
      average: 506
    },
    {
      category: '31-60 Days',
      amount: 28000,
      percentage: 45,
      color: 'accent',
      count: 34,
      average: 824
    },
    {
      category: '61-90 Days',
      amount: 15000,
      percentage: 25,
      color: 'warn',
      count: 18,
      average: 833
    },
    {
      category: '90+ Days',
      amount: 8500,
      percentage: 15,
      color: 'warn',
      count: 12,
      average: 708
    }
  ];

  ngOnInit() {}
}