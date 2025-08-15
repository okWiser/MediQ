import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/store';
import { selectCurrentUser } from '../../../core/store/auth/auth.selectors';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  currentUser$: Observable<User | null>;
  upcomingAppointments = [
    {
      id: '1',
      doctor: 'Dr. Sarah Johnson',
      date: '2024-01-15',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed'
    },
    {
      id: '2',
      doctor: 'Dr. Michael Chen',
      date: '2024-01-20',
      time: '2:30 PM',
      type: 'Consultation',
      status: 'pending'
    }
  ];

  prescriptions = [
    {
      id: '1',
      medication: 'Metformin 500mg',
      dosage: 'Take 1 tablet twice daily',
      prescribedBy: 'Dr. Sarah Johnson',
      date: '2024-01-10',
      status: 'active'
    },
    {
      id: '2',
      medication: 'Lisinopril 10mg',
      dosage: 'Take 1 tablet daily',
      prescribedBy: 'Dr. Michael Chen',
      date: '2024-01-05',
      status: 'active'
    }
  ];

  healthRecords = [
    {
      id: '1',
      type: 'Blood Test',
      date: '2024-01-08',
      results: 'Normal',
      doctor: 'Dr. Sarah Johnson'
    },
    {
      id: '2',
      type: 'X-Ray',
      date: '2024-01-03',
      results: 'No abnormalities',
      doctor: 'Dr. Michael Chen'
    }
  ];

  constructor(private store: Store<AppState>) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {}

  bookAppointment(): void {
    // Navigate to appointment booking
  }

  viewPrescription(id: string): void {
    // View prescription details
  }

  viewHealthRecord(id: string): void {
    // View health record details
  }
}
