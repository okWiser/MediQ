import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <div class="container">
      <h1>User Management</h1>
      
      <mat-card>
        <mat-card-header>
          <mat-card-title>System Users</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <table mat-table [dataSource]="users">
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
                <mat-chip-set>
                  <mat-chip [color]="getRoleColor(user.role)">{{user.role}}</mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip-set>
                  <mat-chip [color]="user.active ? 'primary' : 'warn'">
                    {{user.active ? 'Active' : 'Inactive'}}
                  </mat-chip>
                </mat-chip-set>
              </td>
            </ng-container>
            
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button><mat-icon>edit</mat-icon></button>
                <button mat-icon-button><mat-icon>delete</mat-icon></button>
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
export class UserManagementComponent {
  displayedColumns = ['name', 'email', 'role', 'status', 'actions'];
  users = [
    { name: 'Dr. Smith', email: 'doctor@mediq.com', role: 'doctor', active: true },
    { name: 'John Patient', email: 'patient@mediq.com', role: 'patient', active: true },
    { name: 'Admin User', email: 'admin@mediq.com', role: 'admin', active: true },
    { name: 'Dr. Johnson', email: 'johnson@mediq.com', role: 'doctor', active: false }
  ];

  getRoleColor(role: string): string {
    switch(role) {
      case 'admin': return 'warn';
      case 'doctor': return 'primary';
      case 'patient': return 'accent';
      default: return '';
    }
  }
}