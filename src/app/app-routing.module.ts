import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  { 
    path: 'patient-dashboard', 
    loadComponent: () => import('./features/patient-portal/patient-dashboard.component').then(m => m.PatientDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'patient' }
  },
  { 
    path: 'doctor-dashboard', 
    loadComponent: () => import('./features/doctor-portal/doctor-dashboard.component').then(m => m.DoctorDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'admin-dashboard', 
    loadComponent: () => import('./features/admin-portal/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'symptom-checker', 
    loadComponent: () => import('./features/ai/symptom-checker/symptom-checker.component').then(m => m.SymptomCheckerComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'voice-notes', 
    loadComponent: () => import('./features/voice-notes/voice-notes.component').then(m => m.VoiceNotesComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'smart-scheduling', 
    loadComponent: () => import('./features/smart-scheduling/smart-scheduling.component').then(m => m.SmartSchedulingComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'appointments', 
    loadComponent: () => import('./features/patient-portal/appointments.component').then(m => m.AppointmentsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'medical-records', 
    loadComponent: () => import('./features/patient-portal/medical-records.component').then(m => m.MedicalRecordsComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'patients', 
    loadComponent: () => import('./features/doctor-portal/patient-management.component').then(m => m.PatientManagementComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'doctor-schedule', 
    loadComponent: () => import('./features/doctor-portal/doctor-schedule.component').then(m => m.DoctorScheduleComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'prescriptions', 
    loadComponent: () => import('./features/doctor-portal/prescriptions.component').then(m => m.PrescriptionsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'ai-insights', 
    loadComponent: () => import('./features/doctor-portal/ai-insights.component').then(m => m.AiInsightsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'user-management', 
    loadComponent: () => import('./features/admin-portal/user-management.component').then(m => m.UserManagementComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'hospital-management', 
    loadComponent: () => import('./features/admin-portal/hospital-management.component').then(m => m.HospitalManagementComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'analytics', 
    loadComponent: () => import('./features/admin-portal/analytics.component').then(m => m.AnalyticsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'system-settings', 
    loadComponent: () => import('./features/admin-portal/system-settings.component').then(m => m.SystemSettingsComponent),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }