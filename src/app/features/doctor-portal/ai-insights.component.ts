import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-ai-insights',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTabsModule, MatChipsModule, MatProgressBarModule],
  template: `
    <div class="ai-insights-container">
      <h1>AI Clinical Insights</h1>
      <p class="subtitle">Advanced analytics and predictive insights for your practice</p>
      
      <div class="insights-overview">
        <mat-card class="insight-card">
          <mat-card-content>
            <div class="insight-metric">
              <mat-icon color="primary">psychology</mat-icon>
              <div>
                <span class="metric-value">94%</span>
                <span class="metric-label">Diagnostic Accuracy</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="insight-card">
          <mat-card-content>
            <div class="insight-metric">
              <mat-icon color="accent">trending_up</mat-icon>
              <div>
                <span class="metric-value">23</span>
                <span class="metric-label">Risk Alerts</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
        
        <mat-card class="insight-card">
          <mat-card-content>
            <div class="insight-metric">
              <mat-icon color="warn">schedule</mat-icon>
              <div>
                <span class="metric-value">15min</span>
                <span class="metric-label">Avg Analysis Time</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group>
        <mat-tab label="Patient Risk Analysis">
          <div class="tab-content">
            <mat-card *ngFor="let analysis of riskAnalyses" class="analysis-card">
              <mat-card-header>
                <mat-card-title>{{analysis.patient}}</mat-card-title>
                <mat-card-subtitle>Risk Assessment</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="risk-indicators">
                  <div class="risk-item" *ngFor="let risk of analysis.risks">
                    <div class="risk-header">
                      <span class="risk-condition">{{risk.condition}}</span>
                      <mat-chip [class]="'risk-' + risk.level.toLowerCase()">{{risk.level}} Risk</mat-chip>
                    </div>
                    <mat-progress-bar mode="determinate" [value]="risk.probability" [color]="getRiskColor(risk.level)"></mat-progress-bar>
                    <p class="risk-probability">{{risk.probability}}% probability</p>
                    <p class="risk-recommendation">{{risk.recommendation}}</p>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-button color="primary">View Details</button>
                <button mat-button>Schedule Follow-up</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
        
        <mat-tab label="Treatment Recommendations">
          <div class="tab-content">
            <mat-card *ngFor="let recommendation of treatmentRecommendations" class="recommendation-card">
              <mat-card-header>
                <mat-card-title>{{recommendation.patient}}</mat-card-title>
                <mat-card-subtitle>{{recommendation.condition}}</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="recommendation-content">
                  <h4>AI Recommended Treatment Plan:</h4>
                  <ul>
                    <li *ngFor="let step of recommendation.steps">{{step}}</li>
                  </ul>
                  <div class="confidence-score">
                    <span>Confidence Score: </span>
                    <strong>{{recommendation.confidence}}%</strong>
                  </div>
                  <div class="evidence-base">
                    <span>Based on: </span>
                    <mat-chip *ngFor="let evidence of recommendation.evidence">{{evidence}}</mat-chip>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="primary">Apply Recommendation</button>
                <button mat-button>View Research</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
        
        <mat-tab label="Drug Interactions">
          <div class="tab-content">
            <mat-card *ngFor="let interaction of drugInteractions" class="interaction-card">
              <mat-card-header>
                <mat-card-title>{{interaction.patient}}</mat-card-title>
                <mat-card-subtitle>Potential Drug Interaction Alert</mat-card-subtitle>
              </mat-card-header>
              <mat-card-content>
                <div class="interaction-details">
                  <div class="drug-pair">
                    <span class="drug">{{interaction.drug1}}</span>
                    <mat-icon>warning</mat-icon>
                    <span class="drug">{{interaction.drug2}}</span>
                  </div>
                  <div class="severity">
                    <mat-chip [class]="'severity-' + interaction.severity.toLowerCase()">{{interaction.severity}} Severity</mat-chip>
                  </div>
                  <p class="interaction-description">{{interaction.description}}</p>
                  <div class="recommendations">
                    <h4>Recommendations:</h4>
                    <ul>
                      <li *ngFor="let rec of interaction.recommendations">{{rec}}</li>
                    </ul>
                  </div>
                </div>
              </mat-card-content>
              <mat-card-actions>
                <button mat-raised-button color="warn">Review Prescription</button>
                <button mat-button>Dismiss Alert</button>
              </mat-card-actions>
            </mat-card>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .ai-insights-container { padding: 24px; }
    .subtitle { color: #666; margin-bottom: 24px; }
    .insights-overview {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }
    .insight-card { text-align: center; }
    .insight-metric {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }
    .metric-value {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #1976d2;
    }
    .metric-label {
      display: block;
      font-size: 12px;
      color: #666;
    }
    .tab-content { padding: 24px 0; }
    .analysis-card, .recommendation-card, .interaction-card { margin-bottom: 16px; }
    .risk-item { margin-bottom: 24px; }
    .risk-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }
    .risk-condition { font-weight: 500; }
    .risk-probability { font-size: 12px; color: #666; margin: 4px 0; }
    .risk-recommendation { font-size: 14px; margin-top: 8px; }
    .risk-high { background-color: #ffebee; color: #c62828; }
    .risk-medium { background-color: #fff3e0; color: #ef6c00; }
    .risk-low { background-color: #e8f5e8; color: #2e7d32; }
    .confidence-score { margin: 16px 0; font-weight: 500; }
    .evidence-base { margin-top: 8px; }
    .drug-pair {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 16px;
      font-weight: 500;
    }
    .drug { padding: 8px 16px; background: #f5f5f5; border-radius: 4px; }
    .severity { margin-bottom: 16px; }
    .severity-high { background-color: #ffebee; color: #c62828; }
    .severity-moderate { background-color: #fff3e0; color: #ef6c00; }
    .interaction-description { margin-bottom: 16px; }
    .recommendations h4 { margin-bottom: 8px; }
  `]
})
export class AiInsightsComponent implements OnInit {
  currentUser: User | null = null;
  
  riskAnalyses = [
    {
      patient: 'David Chen',
      risks: [
        {
          condition: 'Cardiovascular Disease',
          level: 'High',
          probability: 78,
          recommendation: 'Recommend immediate cardiology consultation and stress testing'
        },
        {
          condition: 'Type 2 Diabetes',
          level: 'Medium',
          probability: 45,
          recommendation: 'Monitor HbA1c levels, consider lifestyle intervention'
        }
      ]
    },
    {
      patient: 'Jane Smith',
      risks: [
        {
          condition: 'Hypertensive Crisis',
          level: 'Medium',
          probability: 32,
          recommendation: 'Adjust medication dosage, increase monitoring frequency'
        }
      ]
    }
  ];
  
  treatmentRecommendations = [
    {
      patient: 'Bob Johnson',
      condition: 'Type 2 Diabetes Management',
      confidence: 92,
      steps: [
        'Increase Metformin to 1000mg twice daily',
        'Add SGLT2 inhibitor (Empagliflozin 10mg daily)',
        'Refer to diabetes educator for lifestyle counseling',
        'Schedule HbA1c recheck in 3 months'
      ],
      evidence: ['ADA Guidelines 2024', 'Recent Clinical Trials', 'Patient History Analysis']
    },
    {
      patient: 'Maria Garcia',
      condition: 'Prenatal Care Optimization',
      confidence: 88,
      steps: [
        'Continue current prenatal vitamins',
        'Add iron supplement (30mg daily)',
        'Schedule glucose tolerance test at 28 weeks',
        'Monitor blood pressure weekly'
      ],
      evidence: ['ACOG Guidelines', 'Patient Risk Factors', 'Gestational Age']
    }
  ];
  
  drugInteractions = [
    {
      patient: 'John Patient',
      drug1: 'Warfarin',
      drug2: 'Aspirin',
      severity: 'High',
      description: 'Concurrent use significantly increases bleeding risk due to additive anticoagulant effects.',
      recommendations: [
        'Consider alternative antiplatelet therapy',
        'If combination necessary, reduce warfarin dose and monitor INR closely',
        'Educate patient on bleeding precautions'
      ]
    },
    {
      patient: 'Jane Smith',
      drug1: 'Lisinopril',
      drug2: 'Potassium Supplement',
      severity: 'Moderate',
      description: 'ACE inhibitors can increase potassium levels, potentially leading to hyperkalemia.',
      recommendations: [
        'Monitor serum potassium levels regularly',
        'Consider reducing potassium supplement dose',
        'Watch for signs of hyperkalemia'
      ]
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  getRiskColor(level: string): string {
    switch (level.toLowerCase()) {
      case 'high': return 'warn';
      case 'medium': return 'accent';
      default: return 'primary';
    }
  }
}