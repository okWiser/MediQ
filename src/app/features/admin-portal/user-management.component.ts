import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService, User } from '../../core/services/auth.service';
import { MockDataService } from '../../core/services/mock-data.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatTableModule, MatChipsModule],
  template: `
    <div class="users-container">
      <h1>User Management</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>System Users</mat-card-title>
          <mat-card-subtitle>Manage all users in the system</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users" class="users-table">
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Name</th>
              <td mat-cell *matCellDef="let user">{{user.name}}</td>
            </ng-container>
            
            <ng-container matColumnDef="email">
              <th mat-header-cell *matHeaderCellDef>Email</th>
              <td mat-cell *matCellDef="let user">{{user.email}}</td>
            </ng-container>
            
            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Role</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [class]="'role-' + user.role">{{user.role | titlecase}}</mat-chip>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [class]="'status-' + user.status.toLowerCase()">{{user.status}}</mat-chip>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-button color="primary">Edit</button>
                <button mat-button color="warn">Deactivate</button>
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
    .users-container {
      padding: 24px;
    }
    .users-table {
      width: 100%;
    }
    .role-patient {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    .role-doctor {
      background-color: #e8f5e8;
      color: #388e3c;
    }
    .role-admin {
      background-color: #fff3e0;
      color: #f57c00;
    }
    .status-active {
      background-color: #e8f5e8;
      color: #388e3c;
    }
  `]
})
export class UserManagementComponent implements OnInit {
  displayedColumns = ['name', 'email', 'role', 'status', 'actions'];
  users: any[] = [];

  constructor(
    private authService: AuthService,
    private mockDataService: MockDataService
  ) {}

  ngOnInit() {
    this.users = this.mockDataService.getSystemUsers();
  }
}