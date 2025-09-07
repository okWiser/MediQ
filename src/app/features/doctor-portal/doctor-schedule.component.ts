import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-doctor-schedule',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatTabsModule, MatChipsModule],
  template: `
    <div class="schedule-container">
      <h1>My Schedule - Dr. {{currentUser?.name}}</h1>
      
      <div class="schedule-overview">
        <mat-card class="overview-card">
          <mat-card-content>
            <div class="stats-grid">
              <div class="stat-item">
                <span class="stat-number">8</span>
                <span class="stat-label">Today's Appointments</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">2</span>
                <span class="stat-label">Urgent Cases</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">45min</span>
                <span class="stat-label">Avg Consultation</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">94%</span>
                <span class="stat-label">On-Time Rate</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <mat-tab-group>
        <mat-tab label="Today's Schedule">
          <mat-card>
            <mat-card-header>
              <mat-card-title>{{currentDate}} - Schedule</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="todaySchedule" class="schedule-table">
                <ng-container matColumnDef="time">
                  <th mat-header-cell *matHeaderCellDef>Time</th>
                  <td mat-cell *matCellDef="let appt">{{appt.time}}</td>
                </ng-container>
                
                <ng-container matColumnDef="patient">
                  <th mat-header-cell *matHeaderCellDef>Patient</th>
                  <td mat-cell *matCellDef="let appt">{{appt.patient}}</td>
                </ng-container>
                
                <ng-container matColumnDef="type">
                  <th mat-header-cell *matHeaderCellDef>Type</th>
                  <td mat-cell *matCellDef="let appt">{{appt.type}}</td>
                </ng-container>
                
                <ng-container matColumnDef="priority">
                  <th mat-header-cell *matHeaderCellDef>Priority</th>
                  <td mat-cell *matCellDef="let appt">
                    <mat-chip [class]="'priority-' + appt.priority.toLowerCase()">{{appt.priority}}</mat-chip>
                  </td>
                </ng-container>
                
                <ng-container matColumnDef="room">
                  <th mat-header-cell *matHeaderCellDef>Room</th>
                  <td mat-cell *matCellDef="let appt">{{appt.room}}</td>
                </ng-container>
                
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let appt">
                    <span [class]="'status-' + appt.status?.toLowerCase()">{{appt.status || 'Scheduled'}}</span>
                  </td>
                </ng-container>
                
                <tr mat-header-row *matHeaderRowDef="scheduleColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: scheduleColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>
        
        <mat-tab label="This Week">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Weekly Overview</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="week-summary">
                <div class="day-summary" *ngFor="let day of weekSummary">
                  <h3>{{day.date}}</h3>
                  <p>{{day.appointments}} appointments</p>
                  <p class="workload" [class]="day.workload.toLowerCase()">{{day.workload}} workload</p>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .schedule-container { padding: 24px; }
    .schedule-overview { margin-bottom: 24px; }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      text-align: center;
    }
    .stat-number {
      display: block;
      font-size: 24px;
      font-weight: bold;
      color: #1976d2;
    }
    .stat-label {
      font-size: 12px;
      color: #666;
    }
    .schedule-table { width: 100%; }
    .priority-high { background-color: #ffebee; color: #c62828; }
    .priority-medium { background-color: #fff3e0; color: #ef6c00; }
    .priority-routine { background-color: #e8f5e8; color: #2e7d32; }
    .priority-new { background-color: #e3f2fd; color: #1565c0; }
    .status-completed { color: #4caf50; font-weight: 500; }
    .status-in-progress { color: #ff9800; font-weight: 500; }
    .status-scheduled { color: #2196f3; font-weight: 500; }
    .week-summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 16px;
    }
    .day-summary {
      padding: 16px;
      border: 1px solid #ddd;
      border-radius: 8px;
      text-align: center;
    }
    .workload.high { color: #f44336; }
    .workload.medium { color: #ff9800; }
    .workload.light { color: #4caf50; }
  `]
})
export class DoctorScheduleComponent implements OnInit {
  currentUser: User | null = null;
  currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  scheduleColumns = ['time', 'patient', 'type', 'priority', 'room', 'status'];
  todaySchedule: any[] = [];
  
  weekSummary = [
    { date: 'Monday', appointments: 8, workload: 'High' },
    { date: 'Tuesday', appointments: 6, workload: 'Medium' },
    { date: 'Wednesday', appointments: 9, workload: 'High' },
    { date: 'Thursday', appointments: 5, workload: 'Light' },
    { date: 'Friday', appointments: 7, workload: 'Medium' }
  ];

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.loadSchedule();
  }

  loadSchedule() {
    this.todaySchedule = [
      { time: '8:00 AM', patient: 'Maria Garcia', type: 'Prenatal Check-up', priority: 'Routine', room: '205', status: 'Completed' },
      { time: '9:00 AM', patient: 'John Patient', type: 'Annual Physical', priority: 'Routine', room: '301', status: 'Completed' },
      { time: '10:00 AM', patient: 'David Chen', type: 'Cardiac Follow-up', priority: 'High', room: '301', status: 'In Progress' },
      { time: '11:00 AM', patient: 'Jane Smith', type: 'Hypertension Management', priority: 'Medium', room: '301', status: 'Scheduled' },
      { time: '2:00 PM', patient: 'Bob Johnson', type: 'Diabetes Review', priority: 'Medium', room: '301', status: 'Scheduled' },
      { time: '3:00 PM', patient: 'Sarah Wilson', type: 'Initial Consultation', priority: 'New', room: '301', status: 'Scheduled' },
      { time: '4:00 PM', patient: 'Michael Brown', type: 'Post-Surgery Follow-up', priority: 'High', room: '301', status: 'Scheduled' },
      { time: '4:30 PM', patient: 'Emergency Slot', type: 'Available', priority: 'Routine', room: '301', status: 'Available' }
    ];
  }
}