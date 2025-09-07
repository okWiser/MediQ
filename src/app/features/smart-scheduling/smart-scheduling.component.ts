import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-smart-scheduling',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule,
    MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, FormsModule
  ],
  template: `
    <div class="scheduling-container">
      <h1>Smart Scheduling</h1>
      <p class="welcome-text">{{currentUser?.name}}, manage your schedule efficiently</p>
      
      <div class="cards-container">
        <mat-card class="schedule-card" *ngIf="currentUser?.role === 'doctor'">
          <mat-card-header>
            <mat-icon mat-card-avatar>schedule</mat-icon>
            <mat-card-title>Today's Schedule</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <table mat-table [dataSource]="todaySchedule" class="schedule-table">
              <ng-container matColumnDef="time">
                <th mat-header-cell *matHeaderCellDef>Time</th>
                <td mat-cell *matCellDef="let appointment">{{appointment.time}}</td>
              </ng-container>
              
              <ng-container matColumnDef="patient">
                <th mat-header-cell *matHeaderCellDef>Patient</th>
                <td mat-cell *matCellDef="let appointment">{{appointment.patient}}</td>
              </ng-container>
              
              <ng-container matColumnDef="type">
                <th mat-header-cell *matHeaderCellDef>Type</th>
                <td mat-cell *matCellDef="let appointment">{{appointment.type}}</td>
              </ng-container>
              
              <ng-container matColumnDef="duration">
                <th mat-header-cell *matHeaderCellDef>Duration</th>
                <td mat-cell *matCellDef="let appointment">{{appointment.duration}}</td>
              </ng-container>
              
              <tr mat-header-row *matHeaderRowDef="scheduleColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: scheduleColumns;"></tr>
            </table>
          </mat-card-content>
        </mat-card>

        <mat-card class="booking-card" *ngIf="currentUser?.role === 'patient'">
          <mat-card-header>
            <mat-icon mat-card-avatar>event</mat-icon>
            <mat-card-title>Book New Appointment</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Choose a date</mat-label>
              <input matInput [matDatepicker]="picker" [(ngModel)]="selectedDate">
              <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
              <mat-datepicker #picker></mat-datepicker>
            </mat-form-field>
            
            <div class="time-slots">
              <h3>Available Time Slots</h3>
              <div class="slots-grid">
                <button mat-stroked-button 
                        *ngFor="let slot of availableSlots" 
                        [color]="slot.available ? 'primary' : ''"
                        [disabled]="!slot.available"
                        (click)="selectSlot(slot)">
                  {{slot.time}}
                </button>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" [disabled]="!selectedSlot">
              Book Appointment
            </button>
          </mat-card-actions>
        </mat-card>

        <mat-card class="system-card" *ngIf="currentUser?.role === 'admin'">
          <mat-card-header>
            <mat-icon mat-card-avatar>settings</mat-icon>
            <mat-card-title>System Scheduling Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="system-stats">
              <div class="stat-item">
                <span class="stat-number">247</span>
                <span class="stat-label">Appointments Today</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">89%</span>
                <span class="stat-label">Utilization Rate</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">12</span>
                <span class="stat-label">Available Slots</span>
              </div>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary">Manage Schedule</button>
            <button mat-button>View Reports</button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .scheduling-container {
      padding: 24px;
    }
    .welcome-text {
      color: #666;
      margin-bottom: 24px;
    }
    .cards-container {
      display: grid;
      gap: 24px;
    }
    .schedule-table {
      width: 100%;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .time-slots h3 {
      margin: 16px 0 8px 0;
    }
    .slots-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 8px;
    }
    .system-stats {
      display: flex;
      justify-content: space-around;
      margin: 16px 0;
    }
    .stat-item {
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
  `]
})
export class SmartSchedulingComponent implements OnInit {
  currentUser: User | null = null;
  selectedDate: Date | null = null;
  selectedSlot: any = null;
  scheduleColumns = ['time', 'patient', 'type', 'duration'];
  todaySchedule: any[] = [];
  
  availableSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: false },
    { time: '11:00 AM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true }
  ];

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser?.role === 'doctor') {
      this.todaySchedule = this.mockDataService.getDoctorSchedule(this.currentUser.id);
    }
  }

  selectSlot(slot: any) {
    if (slot.available) {
      this.selectedSlot = slot;
    }
  }
}