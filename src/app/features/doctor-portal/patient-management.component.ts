import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
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
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let patient">
                <button mat-button color="primary">View Records</button>
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
  `]
})
export class PatientManagementComponent implements OnInit {
  displayedColumns = ['name', 'age', 'lastVisit', 'condition', 'actions'];
  patients: any[] = [];
  currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.patients = this.mockDataService.getDoctorPatients(this.currentUser.id);
    }
  }
}