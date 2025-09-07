import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-system-settings',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule, 
    MatSlideToggleModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, FormsModule
  ],
  template: `
    <div class="settings-container">
      <h1>System Settings</h1>
      
      <div class="settings-grid">
        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>security</mat-icon>
            <mat-card-title>Security Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="setting-item">
              <mat-slide-toggle [(ngModel)]="settings.twoFactorAuth">
                Two-Factor Authentication
              </mat-slide-toggle>
            </div>
            <div class="setting-item">
              <mat-slide-toggle [(ngModel)]="settings.passwordExpiry">
                Password Expiry (90 days)
              </mat-slide-toggle>
            </div>
            <div class="setting-item">
              <mat-slide-toggle [(ngModel)]="settings.sessionTimeout">
                Auto Session Timeout
              </mat-slide-toggle>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>notifications</mat-icon>
            <mat-card-title>Notification Settings</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="setting-item">
              <mat-slide-toggle [(ngModel)]="settings.emailNotifications">
                Email Notifications
              </mat-slide-toggle>
            </div>
            <div class="setting-item">
              <mat-slide-toggle [(ngModel)]="settings.smsAlerts">
                SMS Alerts
              </mat-slide-toggle>
            </div>
            <div class="setting-item">
              <mat-slide-toggle [(ngModel)]="settings.systemAlerts">
                System Alerts
              </mat-slide-toggle>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>storage</mat-icon>
            <mat-card-title>System Configuration</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Backup Frequency</mat-label>
              <mat-select [(ngModel)]="settings.backupFrequency">
                <mat-option value="daily">Daily</mat-option>
                <mat-option value="weekly">Weekly</mat-option>
                <mat-option value="monthly">Monthly</mat-option>
              </mat-select>
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Max File Size (MB)</mat-label>
              <input matInput type="number" [(ngModel)]="settings.maxFileSize">
            </mat-form-field>
            
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Session Timeout (minutes)</mat-label>
              <input matInput type="number" [(ngModel)]="settings.sessionTimeoutMinutes">
            </mat-form-field>
          </mat-card-content>
        </mat-card>

        <mat-card>
          <mat-card-header>
            <mat-icon mat-card-avatar>info</mat-icon>
            <mat-card-title>System Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-item">
              <strong>Version:</strong> MediQ v2.1.0
            </div>
            <div class="info-item">
              <strong>Database:</strong> PostgreSQL 14.2
            </div>
            <div class="info-item">
              <strong>Server:</strong> AWS EC2 t3.large
            </div>
            <div class="info-item">
              <strong>Last Backup:</strong> {{lastBackup}}
            </div>
            <div class="info-item">
              <strong>Uptime:</strong> 15 days, 8 hours
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="actions-section">
        <button mat-raised-button color="primary" (click)="saveSettings()">
          Save Settings
        </button>
        <button mat-button (click)="resetSettings()">
          Reset to Defaults
        </button>
      </div>
    </div>
  `,
  styles: [`
    .settings-container { padding: 24px; }
    .settings-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
      margin-bottom: 32px;
    }
    .setting-item {
      margin: 16px 0;
      display: flex;
      align-items: center;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .info-item {
      margin: 12px 0;
      padding: 8px 0;
      border-bottom: 1px solid #eee;
    }
    .actions-section {
      display: flex;
      gap: 16px;
      justify-content: center;
    }
  `]
})
export class SystemSettingsComponent implements OnInit {
  lastBackup = new Date().toLocaleDateString();
  
  settings = {
    twoFactorAuth: true,
    passwordExpiry: true,
    sessionTimeout: true,
    emailNotifications: true,
    smsAlerts: false,
    systemAlerts: true,
    backupFrequency: 'daily',
    maxFileSize: 50,
    sessionTimeoutMinutes: 30
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  saveSettings() {
    console.log('Settings saved:', this.settings);
  }

  resetSettings() {
    this.settings = {
      twoFactorAuth: false,
      passwordExpiry: false,
      sessionTimeout: false,
      emailNotifications: true,
      smsAlerts: false,
      systemAlerts: true,
      backupFrequency: 'weekly',
      maxFileSize: 25,
      sessionTimeoutMinutes: 60
    };
  }
}