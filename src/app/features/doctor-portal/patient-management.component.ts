import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-patient-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  template: `
    <div class="container">
      <h1>Patient Management</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>My Patients</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="patients">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let patient">{{patient.name}}</td>
            </ng-container>
            
            <ng-container matColumnDef="age">
              <th mat-header-cell *matHeaderCellDef>Age</th>
              <td mat-cell *matCellDef="let patient">{{patient.age}}</td>
            </ng-container>
            
            <ng-container matColumnDef="condition">
              <th mat-header-cell *matHeaderCellDef>Condition</th>
              <td mat-cell *matCellDef="let patient">{{patient.condition}}</td>
            </ng-container>
            
            <ng-container matColumnDef="lastVisit">
              <th mat-header-cell *matHeaderCellDef>Last Visit</th>
              <td mat-cell *matCellDef="let patient">{{patient.lastVisit}}</td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let patient">
                <button mat-icon-button><mat-icon>visibility</mat-icon></button>
                <button mat-icon-button><mat-icon>edit</mat-icon></button>
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
    .container { padding: 24px; }
    table { width: 100%; }
  `]
})
export class PatientManagementComponent {
  displayedColumns = ['name', 'age', 'condition', 'lastVisit', 'actions'];
  patients = [
    { name: 'John Doe', age: 45, condition: 'Hypertension', lastVisit: '2024-01-10' },
    { name: 'Jane Smith', age: 32, condition: 'Diabetes', lastVisit: '2024-01-08' },
    { name: 'Bob Johnson', age: 67, condition: 'Arthritis', lastVisit: '2024-01-05' }
  ];
}