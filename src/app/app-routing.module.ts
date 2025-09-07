import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SymptomCheckerComponent } from './features/ai/symptom-checker/symptom-checker.component';
import { VoiceNotesComponent } from './features/voice-notes/voice-notes.component';
import { SmartSchedulingComponent } from './features/smart-scheduling/smart-scheduling.component';
import { LoginComponent } from './features/auth/login/login.component';
import { PatientDashboardComponent } from './features/patient-portal/patient-dashboard.component';
import { DoctorDashboardComponent } from './features/doctor-portal/doctor-dashboard.component';
import { AdminDashboardComponent } from './features/admin-portal/admin-dashboard.component';
import { AppointmentsComponent } from './features/patient-portal/appointments.component';
import { MedicalRecordsComponent } from './features/patient-portal/medical-records.component';
import { PatientManagementComponent } from './features/doctor-portal/patient-management.component';
import { UserManagementComponent } from './features/admin-portal/user-management.component';
import { HospitalManagementComponent } from './features/admin-portal/hospital-management.component';
import { AnalyticsComponent } from './features/admin-portal/analytics.component';
import { SystemSettingsComponent } from './features/admin-portal/system-settings.component';
import { DoctorScheduleComponent } from './features/doctor-portal/doctor-schedule.component';
import { PrescriptionsComponent } from './features/doctor-portal/prescriptions.component';
import { AiInsightsComponent } from './features/doctor-portal/ai-insights.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'patient-dashboard', 
    component: PatientDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'patient' }
  },
  { 
    path: 'doctor-dashboard', 
    component: DoctorDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'symptom-checker', 
    component: SymptomCheckerComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'voice-notes', 
    component: VoiceNotesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'smart-scheduling', 
    component: SmartSchedulingComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'appointments', 
    component: AppointmentsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'medical-records', 
    component: MedicalRecordsComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'patients', 
    component: PatientManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'doctor-schedule', 
    component: DoctorScheduleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'prescriptions', 
    component: PrescriptionsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'ai-insights', 
    component: AiInsightsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'doctor' }
  },
  { 
    path: 'user-management', 
    component: UserManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'hospital-management', 
    component: HospitalManagementComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'analytics', 
    component: AnalyticsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { 
    path: 'system-settings', 
    component: SystemSettingsComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'admin' }
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }