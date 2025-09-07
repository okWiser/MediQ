import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { AuthService, User } from '../../core/services/auth.service';

@Component({
  selector: 'app-hospital-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatTabsModule],
  template: `
    <div class="hospital-container">
      <h1>Hospital Management</h1>
      
      <mat-tab-group>
        <mat-tab label="Departments">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Hospital Departments</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="departments" class="full-width">
                <ng-container matColumnDef="name">
                  <th mat-header-cell *matHeaderCellDef>Department</th>
                  <td mat-cell *matCellDef="let dept">{{dept.name}}</td>
                </ng-container>
                <ng-container matColumnDef="head">
                  <th mat-header-cell *matHeaderCellDef>Department Head</th>
                  <td mat-cell *matCellDef="let dept">{{dept.head}}</td>
                </ng-container>
                <ng-container matColumnDef="staff">
                  <th mat-header-cell *matHeaderCellDef>Staff Count</th>
                  <td mat-cell *matCellDef="let dept">{{dept.staff}}</td>
                </ng-container>
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let dept">
                    <span [class]="'status-' + dept.status.toLowerCase()">{{dept.status}}</span>
                  </td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="deptColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: deptColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>
        
        <mat-tab label="Rooms">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Room Management</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <table mat-table [dataSource]="rooms" class="full-width">
                <ng-container matColumnDef="number">
                  <th mat-header-cell *matHeaderCellDef>Room</th>
                  <td mat-cell *matCellDef="let room">{{room.number}}</td>
                </ng-container>
                <ng-container matColumnDef="type">
                  <th mat-header-cell *matHeaderCellDef>Type</th>
                  <td mat-cell *matCellDef="let room">{{room.type}}</td>
                </ng-container>
                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Status</th>
                  <td mat-cell *matCellDef="let room">
                    <span [class]="'status-' + room.status.toLowerCase()">{{room.status}}</span>
                  </td>
                </ng-container>
                <ng-container matColumnDef="patient">
                  <th mat-header-cell *matHeaderCellDef>Patient</th>
                  <td mat-cell *matCellDef="let room">{{room.patient || 'Available'}}</td>
                </ng-container>
                <tr mat-header-row *matHeaderRowDef="roomColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: roomColumns;"></tr>
              </table>
            </mat-card-content>
          </mat-card>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .hospital-container { padding: 24px; }
    .full-width { width: 100%; }
    .status-active { color: #4caf50; font-weight: 500; }
    .status-occupied { color: #ff9800; font-weight: 500; }
    .status-available { color: #4caf50; font-weight: 500; }
    .status-maintenance { color: #f44336; font-weight: 500; }
  `]
})
export class HospitalManagementComponent implements OnInit {
  deptColumns = ['name', 'head', 'staff', 'status'];
  roomColumns = ['number', 'type', 'status', 'patient'];
  
  departments = [
    { name: 'Cardiology', head: 'Dr. Sarah Smith', staff: 12, status: 'Active' },
    { name: 'Emergency', head: 'Dr. Michael Johnson', staff: 18, status: 'Active' },
    { name: 'Pediatrics', head: 'Dr. Emily Davis', staff: 8, status: 'Active' },
    { name: 'Surgery', head: 'Dr. Robert Wilson', staff: 15, status: 'Active' }
  ];
  
  rooms = [
    { number: '101', type: 'ICU', status: 'Occupied', patient: 'John Doe' },
    { number: '102', type: 'ICU', status: 'Available', patient: null },
    { number: '201', type: 'General', status: 'Occupied', patient: 'Jane Smith' },
    { number: '202', type: 'General', status: 'Maintenance', patient: null },
    { number: '301', type: 'Private', status: 'Available', patient: null }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {}
}