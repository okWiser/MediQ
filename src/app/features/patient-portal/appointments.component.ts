import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule],
  template: `
    <div class="appointments-container">
      <h1>My Appointments</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>Upcoming Appointments</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="appointments" class="appointments-table">
            <ng-container matColumnDef="date">
              <th mat-header-cell *matHeaderCellDef>Date</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.date}}</td>
            </ng-container>
            
            <ng-container matColumnDef="time">
              <th mat-header-cell *matHeaderCellDef>Time</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.time}}</td>
            </ng-container>
            
            <ng-container matColumnDef="doctor">
              <th mat-header-cell *matHeaderCellDef>Doctor</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.doctor}}</td>
            </ng-container>
            
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Type</th>
              <td mat-cell *matCellDef="let appointment">{{appointment.type}}</td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .appointments-container {
      padding: 24px;
    }
    .appointments-table {
      width: 100%;
    }
  `]
})
export class AppointmentsComponent {
  displayedColumns = ['date', 'time', 'doctor', 'type'];
  appointments = [
    { date: '2024-01-15', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Checkup' },
    { date: '2024-01-20', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'Follow-up' }
  ];
}