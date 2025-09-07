import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatSnackBarModule],
  template: `
    <div class="patients-container">
      <h1>Patient Management</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>My Patients</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="patients" class="patients-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Patient Name</th>
              <td mat-cell *matCellDef="let patient">{{patient.name}}</td>
            </ng-container>
            
            <ng-container matColumnDef="age">
              <th mat-header-cell *matHeaderCellDef>Age</th>
              <td mat-cell *matCellDef="let patient">{{patient.age}}</td>
            </ng-container>
            
            <ng-container matColumnDef="lastVisit">
              <th mat-header-cell *matHeaderCellDef>Last Visit</th>
              <td mat-cell *matCellDef="let patient">{{patient.lastVisit}}</td>
            </ng-container>
            
            <ng-container matColumnDef="condition">
              <th mat-header-cell *matHeaderCellDef>Condition</th>
              <td mat-cell *matCellDef="let patient">{{patient.condition}}</td>
            </ng-container>
            
            <ng-container matColumnDef="riskLevel">
              <th mat-header-cell *matHeaderCellDef>Risk Level</th>
              <td mat-cell *matCellDef="let patient">
                <span [class]="'risk-' + patient.riskLevel.toLowerCase()">{{patient.riskLevel}}</span>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="nextAppt">
              <th mat-header-cell *matHeaderCellDef>Next Appointment</th>
              <td mat-cell *matCellDef="let patient">{{patient.nextAppt}}</td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let patient">
                <button mat-button color="primary" (click)="viewRecords(patient)">Records</button>
                <button mat-button color="accent" (click)="scheduleAppt(patient)">Schedule</button>
              </td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .patients-container {
      padding: 24px;
    }
    .patients-table {
      width: 100%;
    }
    .risk-low { color: #4caf50; font-weight: 500; }
    .risk-medium { color: #ff9800; font-weight: 500; }
    .risk-high { color: #f44336; font-weight: 500; }
  `]
})
export class PatientManagementComponent implements OnInit {
  displayedColumns = ['name', 'age', 'lastVisit', 'condition', 'riskLevel', 'nextAppt', 'actions'];
  patients: any[] = [];
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.patients = this.mockDataService.getDoctorPatients(this.currentUser.id);
    }
  }

  viewRecords(patient: any) {
    this.snackBar.open(`Opening medical records for ${patient.name}`, 'Close', { duration: 3000 });
  }

  scheduleAppt(patient: any) {
    this.snackBar.open(`Scheduling appointment for ${patient.name}`, 'Close', { duration: 3000 });
  }
}