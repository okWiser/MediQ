import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  medicalLicense?: string;
  specialization?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.loadCurrentUser();
  }

  login(email: string, password: string, role: 'patient' | 'doctor' | 'admin'): Observable<AuthResponse> {
    // Mock authentication for demo
    const mockUsers = {
      'patient@mediq.com': { 
        role: 'patient', 
        name: 'John Patient',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1985-06-15',
        avatar: 'assets/avatars/patient.jpg'
      },
      'doctor@mediq.com': { 
        role: 'doctor', 
        name: 'Dr. Mambegwa',
        phone: '+1 (555) 234-5678',
        medicalLicense: 'MD-12345',
        specialization: 'Internal Medicine & Cardiology',
        avatar: 'assets/avatars/doctor.jpg'
      },
      'admin@mediq.com': { 
        role: 'Chief Technology & Innovation Officer', 
        name: 'N. Shimambani, MSc',
        phone: '+1 (555) 345-6789',
        avatar: 'assets/avatars/admin.jpg'
      }
    };

    const user = mockUsers[email as keyof typeof mockUsers];
    if (user && password === 'demo123' && (user.role === role || (role === 'admin' && user.role === 'Chief Technology & Innovation Officer'))) {
      const mockResponse: AuthResponse = {
        user: {
          id: role === 'patient' ? 'p001' : role === 'doctor' ? 'd001' : 'a001',
          email,
          name: user.name,
          role: role === 'admin' ? 'admin' : role,
          phone: user.phone,
          dateOfBirth: (user as any).dateOfBirth,
          medicalLicense: (user as any).medicalLicense,
          specialization: (user as any).specialization,
          avatar: user.avatar
        },
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600
      };
      return of(mockResponse).pipe(
        tap(response => this.setAuthData(response))
      );
    }
    
    return of().pipe(
      map(() => { throw new Error('Invalid credentials'); })
    );
  }

  register(userData: {
    email: string;
    password: string;
    name: string;
    role: 'patient' | 'doctor' | 'admin';
    phone?: string;
    dateOfBirth?: string;
    medicalLicense?: string;
    specialization?: string;
  }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, userData)
      .pipe(
        tap(response => this.setAuthData(response)),
        catchError(error => {
          throw new Error(error.error?.message || 'Registration failed');
        })
      );
  }

  verify2FA(code: string): Observable<boolean> {
    const token = this.getToken();
    return this.http.post<{ verified: boolean }>(`${this.apiUrl}/auth/verify-2fa`, { code }, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(map(response => response.verified));
  }

  setup2FA(): Observable<{ qrCode: string; secret: string }> {
    const token = this.getToken();
    return this.http.post<{ qrCode: string; secret: string }>(`${this.apiUrl}/auth/setup-2fa`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => this.setAuthData(response))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('user', JSON.stringify(response.user));
    this.currentUserSubject.next(response.user);
  }

  private loadCurrentUser(): void {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      this.currentUserSubject.next(JSON.parse(userStr));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.getCurrentUser();
    return user ? roles.includes(user.role) : false;
  }
}
