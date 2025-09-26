import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-mobile-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <div class="mobile-dashboard">
      <div class="welcome-header">
        <h2>Welcome, {{userName}}</h2>
        <p>{{userRole | titlecase}}</p>
      </div>
      
      <div class="quick-actions">
        <ng-container [ngSwitch]="userRole">
          <!-- Patient Quick Actions -->
          <ng-container *ngSwitchCase="'patient'">
            <button mat-raised-button color="primary" (click)="navigate('/appointments')" class="action-btn">
              <mat-icon>event</mat-icon>
              Appointments
            </button>
            <button mat-raised-button (click)="navigate('/prescriptions')" class="action-btn">
              <mat-icon>medication</mat-icon>
              Prescriptions
            </button>
            <button mat-raised-button (click)="navigate('/telemedicine')" class="action-btn">
              <mat-icon>video_call</mat-icon>
              Video Call
            </button>
            <button mat-raised-button (click)="navigate('/lab-results')" class="action-btn">
              <mat-icon>biotech</mat-icon>
              Lab Results
            </button>
          </ng-container>
          
          <!-- Doctor Quick Actions -->
          <ng-container *ngSwitchCase="'doctor'">
            <button mat-raised-button color="primary" (click)="navigate('/patients')" class="action-btn">
              <mat-icon>people</mat-icon>
              Patients
            </button>
            <button mat-raised-button (click)="navigate('/smart-scheduling')" class="action-btn">
              <mat-icon>schedule</mat-icon>
              Schedule
            </button>
            <button mat-raised-button (click)="navigate('/telemedicine')" class="action-btn">
              <mat-icon>video_call</mat-icon>
              Telemedicine
            </button>
            <button mat-raised-button (click)="navigate('/doctor-prescriptions')" class="action-btn">
              <mat-icon>medication</mat-icon>
              Prescriptions
            </button>
          </ng-container>
          
          <!-- Admin Quick Actions -->
          <ng-container *ngSwitchCase="'admin'">
            <button mat-raised-button color="primary" (click)="navigate('/analytics')" class="action-btn">
              <mat-icon>analytics</mat-icon>
              Analytics
            </button>
            <button mat-raised-button (click)="navigate('/user-management')" class="action-btn">
              <mat-icon>admin_panel_settings</mat-icon>
              Users
            </button>
            <button mat-raised-button (click)="navigate('/system-settings')" class="action-btn">
              <mat-icon>settings</mat-icon>
              Settings
            </button>
            <button mat-raised-button (click)="navigate('/billing')" class="action-btn">
              <mat-icon>receipt</mat-icon>
              Billing
            </button>
          </ng-container>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .mobile-dashboard {
      padding: 16px 8px;
      max-width: 100%;
    }
    
    .welcome-header {
      text-align: center;
      margin-bottom: 24px;
    }
    
    .welcome-header h2 {
      margin: 0 0 4px 0;
      font-size: 1.5rem;
      font-weight: 600;
    }
    
    .welcome-header p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }
    
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
    }
    
    .action-btn {
      height: 80px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
      justify-content: center !important;
      gap: 8px !important;
      font-size: 0.85rem !important;
      border-radius: 12px !important;
    }
    
    .action-btn mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }
    
    @media (min-width: 768px) {
      .mobile-dashboard {
        display: none;
      }
    }
  `]
})
export class MobileDashboardComponent implements OnInit {
  userName = '';
  userRole = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userRole = currentUser.role;
      
      const names = {
        'patient': 'Mathew',
        'doctor': 'Dr. Mambegwa',
        'admin': 'N. Shimambani'
      };
      
      this.userName = names[currentUser.role as keyof typeof names] || 'User';
    }
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }
}