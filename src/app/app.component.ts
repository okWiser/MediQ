import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { AppState } from './core/store';
import { selectIsAuthenticated, selectUserRole } from './core/store/auth/auth.selectors';
import { AuthActions } from './core/store/auth/auth.actions';
import { ThemeService } from './core/services/theme.service';
import { NotificationService, Notification } from './core/services/notification.service';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MediQ';
  isAuthenticated$: Observable<boolean>;
  userRole$: Observable<string | null>;
  isDarkTheme$: Observable<boolean>;
  canGoBack = false;
  notifications: Notification[] = [];
  unreadCount = 0;

  constructor(
    private store: Store<AppState>,
    private themeService: ThemeService,
    private location: Location,
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.userRole$ = this.store.select(selectUserRole);
    this.isDarkTheme$ = this.themeService.isDarkTheme$;
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.canGoBack = !['/', '/login', '/patient-dashboard', '/doctor-dashboard', '/admin-dashboard'].includes(event.url);
      }
    });
    
    this.notificationService.notifications$.subscribe(notifications => {
      this.notifications = notifications;
      this.unreadCount = notifications.filter(n => !n.read).length;
    });
  }

  goBack() {
    this.location.back();
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'warning': return 'warning';
      case 'error': return 'error';
      case 'success': return 'check_circle';
      default: return 'info';
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  getCurrentUserName(): string {
    const user = this.authService.getCurrentUser();
    return user?.name || 'User';
  }

  getCurrentUserRole(): string {
    const user = this.authService.getCurrentUser();
    return user?.role || 'user';
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }
}
