import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-prescriptions',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  template: `
    <div class="prescriptions-container">
      <h1>Prescription Management</h1>
      
      <div class="actions-bar">
        <button mat-raised-button color="primary" (click)="showNewPrescription = !showNewPrescription">
          <mat-icon>add</mat-icon>
          New Prescription
        </button>
      </div>

      <mat-card *ngIf="showNewPrescription" class="new-prescription-card">
        <mat-card-header>
          <mat-card-title>Create New Prescription</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="prescription-form">
            <mat-form-field appearance="outline">
              <mat-label>Patient</mat-label>
              <mat-select [(ngModel)]="newPrescription.patient">
                <mat-option value="John Patient">John Patient</mat-option>
                <mat-option value="Jane Smith">Jane Smith</mat-option>
                <mat-option value="Bob Johnson">Bob Johnson</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Medication</mat-label>
              <input matInput [(ngModel)]="newPrescription.medication" placeholder="e.g., Lisinopril">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Dosage</mat-label>
              <input matInput [(ngModel)]="newPrescription.dosage" placeholder="e.g., 10mg">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Frequency</mat-label>
              <mat-select [(ngModel)]="newPrescription.frequency">
                <mat-option value="Once daily">Once daily</mat-option>
                <mat-option value="Twice daily">Twice daily</mat-option>
                <mat-option value="Three times daily">Three times daily</mat-option>
                <mat-option value="As needed">As needed</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Duration</mat-label>
              <input matInput [(ngModel)]="newPrescription.duration" placeholder="e.g., 30 days">
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Instructions</mat-label>
              <textarea matInput [(ngModel)]="newPrescription.instructions" rows="3" placeholder="Special instructions for patient"></textarea>
            </mat-form-field>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="createPrescription()">Create Prescription</button>
          <button mat-button (click)="showNewPrescription = false">Cancel</button>
        </mat-card-actions>
      </mat-card>

      <mat-card>
        <mat-card-header>
          <mat-card-title>Recent Prescriptions</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="prescriptions" class="prescriptions-table">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let prescription">{{prescription.date}}</td>
            </ng-container>
            
            <ng-container matColumnDef="patient">
              <th mat-header-cell *matHeaderCellDef>Patient</th>
              <td mat-cell *matCellDef="let prescription">{{prescription.patient}}</td>
            </ng-container>
            
            <ng-container matColumnDef="medication">
              <th mat-header-cell *matHeaderCellDef>Medication</th>
              <td mat-cell *matCellDef="let prescription">
                <strong>{{prescription.medication}}</strong><br>
                <small>{{prescription.dosage}} - {{prescription.frequency}}</small>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="duration">
              <th mat-header-cell *matHeaderCellDef>Duration</th>
              <td mat-cell *matCellDef="let prescription">{{prescription.duration}}</td>
            </ng-container>
            
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let prescription">
                <span [class]="'status-' + prescription.status.toLowerCase().replace(' ', '-')">{{prescription.status}}</span>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let prescription">
                <button mat-icon-button><mat-icon>edit</mat-icon></button>
                <button mat-icon-button><mat-icon>print</mat-icon></button>
              </td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="prescriptionColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: prescriptionColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .prescriptions-container { padding: 24px; }
    .actions-bar { margin-bottom: 24px; }
    .new-prescription-card { margin-bottom: 24px; }
    .prescription-form {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 16px;
    }
    .full-width { grid-column: 1 / -1; }
    .prescriptions-table { width: 100%; }
    .status-active { color: #4caf50; font-weight: 500; }
    .status-completed { color: #666; }
    .status-pending-approval { color: #ff9800; font-weight: 500; }
  `]
})
export class PrescriptionsComponent implements OnInit {
  currentUser: User | null = null;
  showNewPrescription = false;
  prescriptionColumns = ['date', 'patient', 'medication', 'duration', 'status', 'actions'];
  
  newPrescription = {
    patient: '',
    medication: '',
    dosage: '',
    frequency: '',
    duration: '',
    instructions: ''
  };
  
  prescriptions = [
    {
      date: '2024-01-14',
      patient: 'John Patient',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      status: 'Active',
      instructions: 'Take with food, monitor blood pressure'
    },
    {
      date: '2024-01-13',
      patient: 'Jane Smith',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      status: 'Active',
      instructions: 'Take with meals, monitor blood glucose'
    },
    {
      date: '2024-01-12',
      patient: 'Bob Johnson',
      medication: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      duration: '30 days',
      status: 'Pending Approval',
      instructions: 'Take at bedtime, avoid grapefruit'
    },
    {
      date: '2024-01-10',
      patient: 'Maria Garcia',
      medication: 'Prenatal Vitamins',
      dosage: '1 tablet',
      frequency: 'Once daily',
      duration: '90 days',
      status: 'Active',
      instructions: 'Take with food to reduce nausea'
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
  }

  createPrescription() {
    const prescription = {
      ...this.newPrescription,
      date: new Date().toLocaleDateString(),
      status: 'Pending Approval'
    };
    this.prescriptions.unshift(prescription);
    this.newPrescription = { patient: '', medication: '', dosage: '', frequency: '', duration: '', instructions: '' };
    this.showNewPrescription = false;
  }
}