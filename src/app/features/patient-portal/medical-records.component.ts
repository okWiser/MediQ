import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule],
  template: `
    <div class="records-container">
      <div class="header-section">
        <h1>Medical Records - {{currentUser?.name}}</h1>
        <p class="patient-info">Patient ID: {{currentUser?.id}} | DOB: {{currentUser?.dateOfBirth}}</p>
      </div>
      
      <mat-accordion>
        <mat-expansion-panel *ngFor="let record of medicalRecords">
          <mat-expansion-panel-header>
            <mat-panel-title>{{record.title}}</mat-panel-title>
            <mat-panel-description>{{record.date}}</mat-panel-description>
          </mat-expansion-panel-header>
          
          <div class="record-content">
            <p><strong>Doctor:</strong> {{record.doctor}}</p>
            <p><strong>Diagnosis:</strong> {{record.diagnosis}}</p>
            <p><strong>Treatment:</strong> {{record.treatment}}</p>
            <p><strong>Notes:</strong> {{record.notes}}</p>
          </div>
        </mat-expansion-panel>
      </mat-accordion>
    </div>
  `,
  styles: [`
    .records-container {
      padding: 24px;
    }
    .header-section {
      margin-bottom: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 8px;
    }
    .patient-info {
      color: #666;
      margin: 8px 0 0 0;
    }
    .record-content {
      margin-top: 16px;
    }
  `]
})
export class MedicalRecordsComponent implements OnInit {
  medicalRecords: any[] = [];
  currentUser: User | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadMedicalRecords();
  }

  private loadMedicalRecords() {
    // Mock medical records based on user
    const mockRecords = {
      'p001': [
        {
          title: 'Annual Physical Exam',
          date: '2024-01-10',
          doctor: 'Dr. Sarah Smith',
          diagnosis: 'Excellent Health',
          treatment: 'Continue current lifestyle, increase vitamin D',
          notes: 'Patient shows excellent vital signs. Blood pressure: 118/76, Heart rate: 68 bpm. Recommended annual follow-up.'
        },
        {
          title: 'Blood Work - Comprehensive Panel',
          date: '2023-12-15',
          doctor: 'Dr. Michael Johnson',
          diagnosis: 'All markers within normal ranges',
          treatment: 'No treatment needed',
          notes: 'Complete blood count, lipid panel, and metabolic panel all within normal limits. Cholesterol: 165 mg/dL, Glucose: 89 mg/dL.'
        },
        {
          title: 'Cardiology Consultation',
          date: '2023-11-22',
          doctor: 'Dr. Emily Davis',
          diagnosis: 'Normal cardiac function',
          treatment: 'Continue regular exercise',
          notes: 'EKG normal, echocardiogram shows normal left ventricular function. No signs of cardiovascular disease.'
        }
      ]
    };
    
    this.medicalRecords = mockRecords[this.currentUser?.id as keyof typeof mockRecords] || [];
  }
}