import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'check-up';
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  prescription?: string;
  fee?: number;
}

export interface AppointmentRequest {
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  duration: number;
  type: 'consultation' | 'follow-up' | 'check-up';
  notes?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAppointments(userId: string, role: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/${userId}?role=${role}`);
  }

  bookAppointment(appointment: AppointmentRequest): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrl}/appointments`, appointment);
  }

  cancelAppointment(appointmentId: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/appointments/${appointmentId}/cancel`);
  }

  rescheduleAppointment(appointmentId: string, newDate: string, newTime: string): Observable<Appointment> {
    return this.http.put<Appointment>(`${this.apiUrl}/appointments/${appointmentId}/reschedule`, { newDate, newTime });
  }

  getDoctorSchedule(doctorId: string, date: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/doctor/${doctorId}/schedule/${date}`);
  }

  getPatientHistory(patientId: string): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/appointments/patient/${patientId}/history`);
  }
}
