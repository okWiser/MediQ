import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../../core/store';
import { selectCurrentUser } from '../../../core/store/auth/auth.selectors';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-doctor-portal',
  templateUrl: './doctor-portal.component.html',
  styleUrls: ['./doctor-portal.component.scss']
})
export class DoctorPortalComponent implements OnInit {
  currentUser$: Observable<User | null>;
  todayAppointments = [
    {
      id: '1',
      patient: 'John Doe',
      time: '9:00 AM',
      duration: 30,
      type: 'Consultation',
      status: 'scheduled'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      time: '10:00 AM',
      duration: 45,
      type: 'Follow-up',
      status: 'scheduled'
    },
    {
      id: '3',
      patient: 'Mike Johnson',
      time: '11:30 AM',
      duration: 30,
      type: 'Check-up',
      status: 'confirmed'
    }
  ];

  patientNotes = [
    {
      id: '1',
      patient: 'John Doe',
      date: '2024-01-15',
      notes: 'Patient reports improvement in symptoms. Continue current medication.',
      followUp: 'Next appointment in 2 weeks'
    },
    {
      id: '2',
      patient: 'Jane Smith',
      date: '2024-01-14',
      notes: 'Blood pressure slightly elevated. Recommend lifestyle changes.',
      followUp: 'Check BP again in 1 week'
    }
  ];

  constructor(private store: Store<AppState>) {
    this.currentUser$ = this.store.select(selectCurrentUser);
  }

  ngOnInit(): void {}

  startVideoCall(appointmentId: string): void {
    // Start video consultation
  }

  addPatientNote(patientId: string): void {
    // Add new patient note
  }

  updateSchedule(): void {
    // Update doctor's schedule
  }
}
