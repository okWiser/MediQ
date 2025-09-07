import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../core/services/auth.service';
import { MockDataService } from '../../../core/services/mock-data.service';

@Component({
  selector: 'app-symptom-checker',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule, FormsModule],
  template: `
    <div class="symptom-checker-container">
      <h1>AI Symptom Checker</h1>
      <p class="welcome-text">Welcome {{currentUser?.name}}, describe your symptoms for AI analysis</p>
      
      <mat-card class="input-card">
        <mat-card-header>
          <mat-icon mat-card-avatar>health_and_safety</mat-icon>
          <mat-card-title>Describe Your Symptoms</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Enter your symptoms</mat-label>
            <textarea matInput [(ngModel)]="symptoms" rows="4" 
                      placeholder="e.g., I have a headache and feel tired..."></textarea>
          </mat-form-field>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="analyzeSymptoms()" [disabled]="!symptoms">
            Analyze Symptoms
          </button>
        </mat-card-actions>
      </mat-card>

      <mat-card *ngIf="analysis" class="results-card">
        <mat-card-header>
          <mat-icon mat-card-avatar color="primary">psychology</mat-icon>
          <mat-card-title>AI Analysis Results</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="analysis-result">
            <h3>Possible Conditions:</h3>
            <ul>
              <li *ngFor="let condition of analysis.conditions">
                {{condition.name}} ({{condition.probability}}% probability)
              </li>
            </ul>
            <h3>Recommendations:</h3>
            <p>{{analysis.recommendation}}</p>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .symptom-checker-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }
    .welcome-text {
      color: #666;
      margin-bottom: 24px;
    }
    .input-card, .results-card {
      margin-bottom: 24px;
    }
    .full-width {
      width: 100%;
    }
    .analysis-result h3 {
      color: #1976d2;
      margin-top: 16px;
    }
  `]
})
export class SymptomCheckerComponent implements OnInit {
  currentUser: User | null = null;
  symptoms = '';
  analysis: any = null;

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  analyzeSymptoms() {
    this.analysis = this.mockDataService.getSymptomAnalysis(this.symptoms);
  }
}