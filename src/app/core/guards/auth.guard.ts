import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const user = this.authService.getCurrentUser();
      const currentUrl = this.router.url;
      
      // If user is on root path, redirect to their dashboard
      if (currentUrl === '/' || currentUrl === '') {
        switch (user?.role) {
          case 'patient':
            this.router.navigate(['/patient-dashboard']);
            break;
          case 'doctor':
            this.router.navigate(['/doctor-dashboard']);
            break;
          case 'admin':
            this.router.navigate(['/admin-dashboard']);
            break;
          default:
            this.router.navigate(['/patient-dashboard']);
        }
        return false;
      }
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}