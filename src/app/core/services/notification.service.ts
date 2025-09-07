import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Appointment Reminder',
      message: 'You have an appointment with Dr. Smith tomorrow at 10:00 AM',
      timestamp: new Date(),
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Lab Results Available',
      message: 'Your blood work results are now available',
      timestamp: new Date(Date.now() - 3600000),
      read: false
    }
  ]);
  
  public notifications$ = this.notifications.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['success-snackbar']
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: ['error-snackbar']
    });
  }

  getUnreadCount(): number {
    return this.notifications.value.filter(n => !n.read).length;
  }

  markAsRead(id: string) {
    const notifications = this.notifications.value.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    this.notifications.next(notifications);
  }
}