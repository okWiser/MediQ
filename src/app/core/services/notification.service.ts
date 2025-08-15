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
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notificationsSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  showSuccess(message: string, title?: string): void {
    this.showNotification('success', message, title || 'Success');
  }

  showError(message: string, title?: string): void {
    this.showNotification('error', message, title || 'Error');
  }

  showWarning(message: string, title?: string): void {
    this.showNotification('warning', message, title || 'Warning');
  }

  showInfo(message: string, title?: string): void {
    this.showNotification('info', message, title || 'Info');
  }

  private showNotification(type: string, message: string, title: string): void {
    const panelClass = `snackbar-${type}`;
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });

    this.addNotification({
      id: Date.now().toString(),
      type: type as any,
      title,
      message,
      timestamp: new Date(),
      read: false
    });
  }

  private addNotification(notification: Notification): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([notification, ...current]);
  }

  markAsRead(id: string): void {
    const notifications = this.notificationsSubject.value.map(n =>
      n.id === id ? { ...n, read: true } : n
    );
    this.notificationsSubject.next(notifications);
  }

  markAllAsRead(): void {
    const notifications = this.notificationsSubject.value.map(n => ({ ...n, read: true }));
    this.notificationsSubject.next(notifications);
  }

  clearNotification(id: string): void {
    const notifications = this.notificationsSubject.value.filter(n => n.id !== id);
    this.notificationsSubject.next(notifications);
  }

  clearAll(): void {
    this.notificationsSubject.next([]);
  }
}
