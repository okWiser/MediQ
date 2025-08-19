import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface SmartScheduleSuggestion {
  doctorId: string;
  doctorName: string;
  specialization: string;
  availableSlots: TimeSlot[];
  matchScore: number;
  reasonForSuggestion: string;
}

export interface TimeSlot {
  date: string;
  time: string;
  duration: number;
  priority: 'high' | 'medium' | 'low';
}

export interface ScheduleOptimization {
  currentLoad: number;
  suggestedBreaks: TimeSlot[];
  conflictResolutions: string[];
  efficiencyScore: number;
}

@Injectable({
  providedIn: 'root'
})
export class SmartSchedulingService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getSuggestedAppointments(
    patientId: string, 
    symptoms?: string[], 
    urgency?: string
  ): Observable<SmartScheduleSuggestion[]> {
    const payload = { patientId, symptoms, urgency };
    return this.http.post<SmartScheduleSuggestion[]>(`${this.apiUrl}/scheduling/suggestions`, payload);
  }

  optimizeDoctorSchedule(doctorId: string, date: string): Observable<ScheduleOptimization> {
    return this.http.post<ScheduleOptimization>(`${this.apiUrl}/scheduling/optimize`, { doctorId, date });
  }

  findOptimalTimeSlot(
    doctorId: string, 
    patientPreferences: any, 
    appointmentType: string
  ): Observable<TimeSlot[]> {
    const payload = { doctorId, patientPreferences, appointmentType };
    return this.http.post<TimeSlot[]>(`${this.apiUrl}/scheduling/optimal-slots`, payload);
  }

  predictNoShows(appointmentData: any[]): Observable<{ appointmentId: string; riskScore: number }[]> {
    return this.http.post<{ appointmentId: string; riskScore: number }[]>(
      `${this.apiUrl}/scheduling/predict-no-shows`, 
      { appointments: appointmentData }
    );
  }
}