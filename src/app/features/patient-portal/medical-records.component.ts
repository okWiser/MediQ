import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-medical-records',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatExpansionModule],
  template: `
    <div class="records-container">
      <h1>Medical Records</h1>
      
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
    .record-content {
      margin-top: 16px;
    }
  `]
})
export class MedicalRecordsComponent {
  medicalRecords = [
    {
      title: 'Annual Physical Exam',
      date: '2024-01-10',
      doctor: 'Dr. Smith',
      diagnosis: 'Healthy',
      treatment: 'Continue current lifestyle',
      notes: 'Patient in good health, recommended annual follow-up'
    },
    {
      title: 'Blood Work Results',
      date: '2023-12-15',
      doctor: 'Dr. Johnson',
      diagnosis: 'Normal ranges',
      treatment: 'No treatment needed',
      notes: 'All blood markers within normal limits'
    }
  ];
}