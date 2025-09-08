import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-telemedicine',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="dashboard-container">
      <h1>Telemedicine</h1>
      
      <div class="dashboard-grid">
        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Upcoming Virtual Appointments</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="appointment-list">
              <div class="appointment-item" *ngFor="let appointment of virtualAppointments">
                <div class="appointment-header">
                  <div class="doctor-info">
                    <mat-icon>video_call</mat-icon>
                    <div>
                      <div class="doctor-name">Dr. {{appointment.doctor}}</div>
                      <div class="specialty">{{appointment.specialty}}</div>
                    </div>
                  </div>
                  <mat-chip [class]="'status-' + appointment.status">{{appointment.status}}</mat-chip>
                </div>
                <div class="appointment-details">
                  <div class="detail-item">
                    <mat-icon>schedule</mat-icon>
                    <span>{{appointment.date}} at {{appointment.time}}</span>
                  </div>
                  <div class="detail-item">
                    <mat-icon>timer</mat-icon>
                    <span>{{appointment.duration}} minutes</span>
                  </div>
                </div>
                <div class="appointment-actions">
                  <button mat-raised-button color="primary" *ngIf="appointment.status === 'confirmed'">Join Call</button>
                  <button mat-button>Reschedule</button>
                  <button mat-button>Cancel</button>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="overview-card">
          <mat-card-header>
            <mat-card-title>Quick Consultation</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <p>Need immediate medical advice? Connect with available doctors now.</p>
            <div class="quick-consult-options">
              <button mat-raised-button color="primary">
                <mat-icon>video_call</mat-icon>
                Video Consultation
              </button>
              <button mat-raised-button>
                <mat-icon>chat</mat-icon>
                Chat Consultation
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .appointment-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .appointment-item {
      padding: 16px;
      border: 1px solid var(--premium-border);
      border-radius: 8px;
      background: var(--premium-card);
    }
    .appointment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }
    .doctor-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .doctor-name {
      font-weight: 600;
      color: var(--premium-text);
    }
    .specialty {
      font-size: 12px;
      color: var(--premium-text-muted);
    }
    .appointment-details {
      display: flex;
      gap: 24px;
      margin-bottom: 16px;
    }
    .detail-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--premium-text-muted);
    }
    .appointment-actions {
      display: flex;
      gap: 12px;
    }
    .quick-consult-options {
      display: flex;
      gap: 12px;
      margin-top: 16px;
    }
  `]
})
export class TelemedicineComponent implements OnInit {
  virtualAppointments = [
    {
      doctor: 'Mambegwa',
      specialty: 'Internal Medicine & Cardiology',
      date: 'Today',
      time: '2:00 PM',
      duration: 30,
      status: 'confirmed'
    },
    {
      doctor: 'Mambegwa',
      specialty: 'Cardiology Consultation',
      date: 'Tomorrow',
      time: '10:00 AM',
      duration: 45,
      status: 'pending'
    }
  ];

  ngOnInit() {}
}